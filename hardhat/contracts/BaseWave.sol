// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Interface for RecurringPayments contract
interface IRecurringPayments {
    struct Subscription {
        address customer;
        address payee;
        string name;
        string description;
        uint256 subscriptionPeriod;
        bool isActive;
        bool exists;
    }

    function getSubscription(address _customer, address _payee) external view returns (Subscription memory);
}

contract BaseWave is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;
    IRecurringPayments recurringPaymentsContract;

    struct SubscriptionMetadata {
        address customer;
        address payee;
        string name;
        string description;
        uint256 subscriptionPeriod;
    }

    mapping(uint256 => SubscriptionMetadata) private _subscriptionMetadata;

    constructor(address initialOwner, address _recurringPaymentsAddress)
        ERC721("BaseWave", "BAW")
        Ownable(initialOwner)
    {
        recurringPaymentsContract = IRecurringPayments(_recurringPaymentsAddress);
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;

        // Fetch subscription details from RecurringPayments contract
        IRecurringPayments.Subscription memory subscription = recurringPaymentsContract.getSubscription(to, address(this));

        require(subscription.exists && subscription.isActive, "No active subscription found");

        // Store subscription details as metadata
        _subscriptionMetadata[tokenId] = SubscriptionMetadata({
            customer: subscription.customer,
            payee: subscription.payee,
            name: subscription.name,
            description: subscription.description,
            subscriptionPeriod: subscription.subscriptionPeriod
        });

        // Mint the NFT
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, ""); // Optionally set token URI
    }

    function getSubscriptionMetadata(uint256 tokenId) public view returns (SubscriptionMetadata memory) {
        return _subscriptionMetadata[tokenId];
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}