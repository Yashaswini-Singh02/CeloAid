export class FundingContract {
  public static readonly ABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_minContribution",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_maxContribution",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "goal",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
      ],
      name: "CampaignCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "donor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Funded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "contributor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "RefundIssued",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Withdrawn",
      type: "event",
    },
    {
      inputs: [],
      name: "campaignCount",
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
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "campaigns",
      outputs: [
        {
          internalType: "uint256",
          name: "goal",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "totalFunds",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "completed",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "failed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "goal",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
      ],
      name: "createCampaign",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
      ],
      name: "fund",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
      ],
      name: "getCampaignDetails",
      outputs: [
        {
          internalType: "uint256",
          name: "goal",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "totalFunds",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "completed",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "failed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
      ],
      name: "getContribution",
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
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
      ],
      name: "issueRefund",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "maxContribution",
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
      inputs: [],
      name: "minContribution",
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
      inputs: [
        {
          internalType: "uint256",
          name: "campaignId",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  public static readonly ADDRESS = "0xeff531D43600A925c0D282f755bA0d39AA82EF14";
  public static readonly ALFAJORES_ADDRESS = "0x79A24817Ac317549A2d1e00109f0FA7424E45838";
}


