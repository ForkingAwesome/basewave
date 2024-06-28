export const ABI_RECURRING_PAYMENTS = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "customer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "payee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lastExecutionDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "subscriptionPeriod",
        type: "uint256",
      },
    ],
    name: "NewSubscription",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "customer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "payee",
        type: "address",
      },
    ],
    name: "SubscriptionCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "customer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "payee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nextPaymentDate",
        type: "uint256",
      },
    ],
    name: "SubscriptionPaid",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_customer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_payee",
        type: "address",
      },
    ],
    name: "autoExecutePayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_customer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_payee",
        type: "address",
      },
    ],
    name: "cancelSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_payee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_subscriptionCost",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_subscriptionPeriod",
        type: "uint256",
      },
    ],
    name: "createSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_customer",
        type: "address",
      },
    ],
    name: "executePayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_customer",
        type: "address",
      },
    ],
    name: "getAllActiveSubscriptions",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "customer",
            type: "address",
          },
          {
            internalType: "address",
            name: "payee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "lastExecutionDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "subscriptionPeriod",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct RecurringPayments.Subscription[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_customer",
        type: "address",
      },
    ],
    name: "getAllCreatedSubscriptions",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "customer",
            type: "address",
          },
          {
            internalType: "address",
            name: "payee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "creationDate",
            type: "uint256",
          },
        ],
        internalType: "struct RecurringPayments.SubscriptionReceipt[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_payee",
        type: "address",
      },
    ],
    name: "getAllSubscribers",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "customer",
            type: "address",
          },
          {
            internalType: "address",
            name: "payee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "lastExecutionDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "subscriptionPeriod",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct RecurringPayments.Subscription[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllSubscriptionPlans",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "customer",
            type: "address",
          },
          {
            internalType: "address",
            name: "payee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "lastExecutionDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "subscriptionPeriod",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct RecurringPayments.Subscription[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_customer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_payee",
        type: "address",
      },
    ],
    name: "getSubscription",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "customer",
            type: "address",
          },
          {
            internalType: "address",
            name: "payee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "lastExecutionDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "subscriptionPeriod",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct RecurringPayments.Subscription",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_customer",
        type: "address",
      },
    ],
    name: "getSubscriptionReceipts",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "customer",
            type: "address",
          },
          {
            internalType: "address",
            name: "payee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "creationDate",
            type: "uint256",
          },
        ],
        internalType: "struct RecurringPayments.SubscriptionReceipt[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_customer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_payee",
        type: "address",
      },
    ],
    name: "subscriptionTimeRemaining",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
