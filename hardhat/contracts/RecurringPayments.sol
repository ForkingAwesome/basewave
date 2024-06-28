// SPDX-License-Identifier: MIT
// File: @openzeppelin/contracts/security/ReentrancyGuard.sol

// OpenZeppelin Contracts (last updated v4.9.0) (security/ReentrancyGuard.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be _NOT_ENTERED
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == _ENTERED;
    }
}

// File: @openzeppelin/contracts/utils/Context.sol

// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)

pragma solidity ^0.8.20;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol

// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

pragma solidity ^0.8.20;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: test.sol

pragma solidity >=0.8.25;

contract RecurringPayments is ReentrancyGuard, Ownable {
    // Events
    event NewSubscription(
        address indexed customer,
        address indexed payee,
        uint256 allowance,
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
        string name;
        string description;
        uint256 creationDate;
    }

    struct CustomerPayeePair {
        address customer;
        address payee;
    }

    // State Variables
    mapping(address => mapping(address => Subscription)) private subscriptions;
    mapping(address => SubscriptionReceipt[]) private receipts;
    CustomerPayeePair[] private customerPayeePair;

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
    function getSubscription(
        address _customer,
        address _payee
    ) public view returns (Subscription memory) {
        require(
            subscriptions[_customer][_payee].exists,
            "Subscription does not exist."
        );
        return subscriptions[_customer][_payee];
    }

    function getSubscriptionReceipts(
        address _customer
    ) public view returns (SubscriptionReceipt[] memory) {
        return receipts[_customer];
    }

    function subscriptionTimeRemaining(
        address _customer,
        address _payee
    ) public view returns (uint256) {
        Subscription memory sub = getSubscription(_customer, _payee);

        uint256 remaining = sub.lastExecutionDate + sub.subscriptionPeriod;

        if (block.timestamp >= remaining) {
            return 0;
        } else {
            return remaining - block.timestamp;
        }
    }

    // Subscription Management Functions
    function createSubscription(
        address _payee,
        uint256 _subscriptionCost,
        string memory _name,
        string memory _description,
        uint256 _subscriptionPeriod
    ) public nonReentrant {
        require(
            !subscriptions[msg.sender][_payee].exists ||
                !subscriptions[msg.sender][_payee].isActive,
            "Active subscription already exists."
        );

        subscriptions[msg.sender][_payee] = Subscription(
            msg.sender,
            _payee,
            _subscriptionCost,
            _name,
            _description,
            block.timestamp,
            _subscriptionPeriod,
            true,
            true
        );

        customerPayeePair.push(CustomerPayeePair(msg.sender, _payee));

        receipts[msg.sender].push(
            SubscriptionReceipt(
                msg.sender,
                _payee,
                _subscriptionCost,
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
                _name,
                _description,
                block.timestamp
            )
        );

        emit NewSubscription(
            msg.sender,
            _payee,
            _subscriptionCost,
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

    function cancelSubscription(
        address _customer,
        address _payee
    ) public nonReentrant onlySubscriptionParties(_customer, _payee) {
        Subscription memory sub = getSubscription(_customer, _payee);
        require(sub.isActive, "Subscription already inactive.");

        subscriptions[_customer][_payee].isActive = false;

        emit SubscriptionCancelled(_customer, _payee);
    }

    function executePayment(address _customer) public nonReentrant {
        Subscription memory sub = getSubscription(_customer, msg.sender);
        require(
            sub.payee == msg.sender,
            "Only subscription payees may execute a subscription payment."
        );
        require(sub.isActive, "Subscription already inactive.");
        require(
            subscriptionTimeRemaining(_customer, msg.sender) == 0,
            "Subscription period not yet over."
        );

        subscriptions[_customer][msg.sender].lastExecutionDate = block
            .timestamp;

        emit SubscriptionPaid(
            _customer,
            msg.sender,
            block.timestamp,
            sub.allowance,
            block.timestamp + sub.subscriptionPeriod
        );
    }

    function autoExecutePayment(
        address _customer,
        address _payee
    ) external nonReentrant {
        require(
            subscriptionTimeRemaining(_customer, _payee) == 0,
            "Subscription period not yet over."
        );
        executePayment(_customer);
    }

    // Getter Functions

    function getAllSubscriptionPlans()
        public
        view
        returns (Subscription[] memory)
    {
        Subscription[] memory allSubscriptions = new Subscription[](
            customerPayeePair.length
        );

        for (uint256 i = 0; i < customerPayeePair.length; i++) {
            CustomerPayeePair memory _customerPayeePair = customerPayeePair[i];
            allSubscriptions[i] = subscriptions[_customerPayeePair.customer][
                _customerPayeePair.payee
            ];
        }

        return allSubscriptions;
    }

    function getAllSubscribers(
        address _payee
    ) public view returns (Subscription[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < receipts[_payee].length; i++) {
            if (subscriptions[receipts[_payee][i].customer][_payee].isActive) {
                count++;
            }
        }

        Subscription[] memory subscribers = new Subscription[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < receipts[_payee].length; i++) {
            if (subscriptions[receipts[_payee][i].customer][_payee].isActive) {
                subscribers[index] = subscriptions[
                    receipts[_payee][i].customer
                ][_payee];
                index++;
            }
        }
        return subscribers;
    }

    function getAllActiveSubscriptions(
        address _customer
    ) public view returns (Subscription[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < receipts[_customer].length; i++) {
            if (
                subscriptions[_customer][receipts[_customer][i].payee].isActive
            ) {
                count++;
            }
        }

        Subscription[] memory activeSubscriptions = new Subscription[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < receipts[_customer].length; i++) {
            if (
                subscriptions[_customer][receipts[_customer][i].payee].isActive
            ) {
                activeSubscriptions[index] = subscriptions[_customer][
                    receipts[_customer][i].payee
                ];
                index++;
            }
        }
        return activeSubscriptions;
    }

    function getAllCreatedSubscriptions(
        address _customer
    ) public view returns (SubscriptionReceipt[] memory) {
        return receipts[_customer];
    }
}
