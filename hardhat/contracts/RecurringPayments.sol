// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RecurringPayments is ReentrancyGuard, Ownable {
    // Events
    event NewSubscription(
        address indexed customer,
        address indexed payee,
        uint256 allowance,
        address tokenAddress,
        string name,
        string description,
        uint256 lastExecutionDate,
        uint256 subscriptionPeriod
    );
    event SubscriptionCancelled(
        address indexed customer,
        address indexed payee
    );
    event SubscriptionPaid(
        address indexed customer,
        address indexed payee,
        uint256 paymentDate,
        uint256 paymentAmount,
        uint256 nextPaymentDate
    );

    // Data Structures
    struct Subscription {
        address customer;
        address payee;
        uint256 allowance;
        address tokenAddress;
        string name;
        string description;
        uint256 lastExecutionDate;
        uint256 subscriptionPeriod;
        bool isActive;
        bool exists;
    }

    struct SubscriptionReceipt {
        address customer;
        address payee;
        uint256 allowance;
        address tokenAddress;
        string name;
        string description;
        uint256 creationDate;
    }

    // State Variables
    mapping(address => mapping(address => Subscription)) public subscriptions;
    mapping(address => SubscriptionReceipt[]) public receipts;

    // Constructor
    constructor() Ownable(msg.sender) {}

    // Modifiers
    modifier onlySubscriptionParties(address _customer, address _payee) {
        require(
            msg.sender == _customer || msg.sender == _payee,
            "Only subscription parties can perform this action."
        );
        _;
    }

    // View Functions
    function getSubscription(address _customer, address _payee)
        public
        view
        returns (Subscription memory)
    {
        return subscriptions[_customer][_payee];
    }

    function getSubscriptionReceipts(address _customer)
        public
        view
        returns (SubscriptionReceipt[] memory)
    {
        return receipts[_customer];
    }

    function subscriptionTimeRemaining(address _customer, address _payee)
        public
        view
        returns (uint256)
    {
        Subscription memory sub = getSubscription(_customer, _payee);
        uint256 remaining = sub.lastExecutionDate + sub.subscriptionPeriod;
        if (block.timestamp > remaining) {
            return 0;
        } else {
            return remaining - block.timestamp;
        }
    }

    // Subscription Management Functions
    function createSubscription(
        address _payee,
        uint256 _subscriptionCost,
        address _tokenAddress,
        string memory _name,
        string memory _description,
        uint256 _subscriptionPeriod
    ) public nonReentrant {
        IERC20 tokenInterface = IERC20(_tokenAddress);

        require(
            getSubscription(msg.sender, _payee).isActive != true,
            "Active subscription already exists."
        );
        require(
            _subscriptionCost <= tokenInterface.balanceOf(msg.sender),
            "Insufficient token balance."
        );

        subscriptions[msg.sender][_payee] = Subscription(
            msg.sender,
            _payee,
            _subscriptionCost,
            _tokenAddress,
            _name,
            _description,
            block.timestamp,
            _subscriptionPeriod,
            true,
            true
        );

        receipts[msg.sender].push(
            SubscriptionReceipt(
                msg.sender,
                _payee,
                _subscriptionCost,
                _tokenAddress,
                _name,
                _description,
                block.timestamp
            )
        );

        receipts[_payee].push(
            SubscriptionReceipt(
                msg.sender,
                _payee,
                _subscriptionCost,
                _tokenAddress,
                _name,
                _description,
                block.timestamp
            )
        );

        require(
            tokenInterface.allowance(msg.sender, address(this)) >=
                (_subscriptionCost * 2),
            "Allowance of (_subscriptionCost * 2) required."
        );
        require(
            tokenInterface.transferFrom(msg.sender, _payee, _subscriptionCost),
            "Initial subscription payment failed."
        );

        emit NewSubscription(
            msg.sender,
            _payee,
            _subscriptionCost,
            _tokenAddress,
            _name,
            _description,
            block.timestamp,
            _subscriptionPeriod
        );
        emit SubscriptionPaid(
            msg.sender,
            _payee,
            block.timestamp,
            _subscriptionCost,
            block.timestamp + _subscriptionPeriod
        );
    }

    function cancelSubscription(address _customer, address _payee)
        public
        nonReentrant
        onlySubscriptionParties(_customer, _payee)
    {
        Subscription memory sub = getSubscription(_customer, _payee);
        require(sub.isActive == true, "Subscription already inactive.");

        subscriptions[_customer][_payee].isActive = false;

        emit SubscriptionCancelled(_customer, _payee);
    }

    function executePayment(address _customer) public nonReentrant {
        Subscription memory sub = getSubscription(_customer, msg.sender);
        require(
            sub.payee == msg.sender,
            "Only subscription payees may execute a subscription payment."
        );
        require(sub.isActive == true, "Subscription already inactive.");
        require(
            subscriptionTimeRemaining(_customer, msg.sender) == 0,
            "Subscription period not yet over."
        );

        IERC20 tokenInterface = IERC20(sub.tokenAddress);

        subscriptions[_customer][msg.sender].lastExecutionDate = block
            .timestamp;
        require(
            tokenInterface.transferFrom(_customer, msg.sender, sub.allowance),
            "Subscription payment failed."
        );

        emit SubscriptionPaid(
            _customer,
            msg.sender,
            block.timestamp,
            sub.allowance,
            block.timestamp + sub.subscriptionPeriod
        );
    }

    function autoExecutePayment(address _customer, address _payee)
        external
        nonReentrant
    {
        require(
            subscriptionTimeRemaining(_customer, _payee) == 0,
            "Subscription period not yet over."
        );
        executePayment(_customer);
    }

    function _subscriptionPaid(address _customer, address _payee)
        internal
        view
        returns (bool)
    {
        Subscription memory sub = getSubscription(_customer, _payee);
        uint256 remaining = sub.lastExecutionDate + sub.subscriptionPeriod;
        return block.timestamp <= remaining;
    }

    // Getter Functions

    // Get all subscription plans with status of isActive
    function getAllSubscriptionPlans()
        public
        view
        returns (Subscription[] memory)
    {
        Subscription[] memory plans;
        for (uint256 i = 0; i < receipts[msg.sender].length; i++) {
            if (
                subscriptions[receipts[msg.sender][i].customer][
                    receipts[msg.sender][i].payee
                ].isActive
            ) {
                plans[i] = subscriptions[receipts[msg.sender][i].customer][
                    receipts[msg.sender][i].payee
                ];
            }
        }
        return plans;
    }

    // Get all subscribers of a particular subscription plan that can be fetched using planId as a parameter to function.
    function getAllSubscribers(address _payee)
        public
        view
        returns (Subscription[] memory)
    {
        Subscription[] memory subscribers;
        for (uint256 i = 0; i < receipts[_payee].length; i++) {
            subscribers[i] = subscriptions[receipts[_payee][i].customer][
                _payee
            ];
        }
        return subscribers;
    }

    // Get all active subscriptions for a particular user address.
    function getAllActiveSubscriptions(address _customer)
        public
        view
        returns (Subscription[] memory)
    {
        Subscription[] memory activeSubscriptions;
        uint256 count = 0;
        for (uint256 i = 0; i < receipts[_customer].length; i++) {
            if (
                subscriptions[_customer][receipts[_customer][i].payee].isActive
            ) {
                activeSubscriptions[count] = subscriptions[_customer][
                    receipts[_customer][i].payee
                ];
                count++;
            }
        }
        return activeSubscriptions;
    }

    // Get all created subscriptions for a particular user address
    function getAllCreatedSubscriptions(address _customer)
        public
        view
        returns (SubscriptionReceipt[] memory)
    {
        return receipts[_customer];
    }
}