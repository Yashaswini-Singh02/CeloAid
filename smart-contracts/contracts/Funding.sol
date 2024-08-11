// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Funding {
    struct Campaign {
        uint256 goal;
        uint256 deadline;
        uint256 totalFunds;
        bool completed;
        bool failed;
        mapping(address => uint256) contributors;
    }

    address public owner;
    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    uint256 public minContribution;
    uint256 public maxContribution;

    event CampaignCreated(uint256 campaignId, uint256 goal, uint256 deadline);
    event Funded(uint256 campaignId, address indexed donor, uint256 amount);
    event Withdrawn(uint256 campaignId, address indexed owner, uint256 amount);
    event RefundIssued(uint256 campaignId, address indexed contributor, uint256 amount);

    constructor(uint256 _minContribution, uint256 _maxContribution) {
        owner = msg.sender;
        minContribution = _minContribution;
        maxContribution = _maxContribution;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    modifier campaignExists(uint256 campaignId) {
        require(campaignId < campaignCount, "Campaign does not exist");
        _;
    }

    modifier notCompleted(uint256 campaignId) {
        require(!campaigns[campaignId].completed, "Campaign already completed");
        _;
    }

    modifier notFailed(uint256 campaignId) {
        require(!campaigns[campaignId].failed, "Campaign failed");
        _;
    }

    function createCampaign(uint256 goal, uint256 deadline) external onlyOwner {
        require(deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.goal = goal;
        newCampaign.deadline = deadline;
        campaignCount +=  1;

        emit CampaignCreated(campaignCount, goal, deadline);
    }

    function fund(uint256 campaignId) external payable campaignExists(campaignId) notCompleted(campaignId) notFailed(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(msg.value >= minContribution && msg.value <= maxContribution, "Contribution amount out of range");
        require(block.timestamp < campaign.deadline, "Campaign has ended");

        campaign.contributors[msg.sender] += msg.value;
        campaign.totalFunds += msg.value;

        if(campaign.totalFunds >= campaign.goal){
            campaign.completed = true;
        }

        emit Funded(campaignId, msg.sender, msg.value);
    }

    function withdraw(uint256 campaignId) external onlyOwner campaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign is not yet completed");
        require(campaign.totalFunds >= campaign.goal, "Campaign did not reach the goal");
        require(!campaign.completed, "Funds already withdrawn");

        uint256 amount = campaign.totalFunds;
        campaign.totalFunds = 0;
        campaign.completed = true;
        payable(owner).transfer(amount);

        emit Withdrawn(campaignId, owner, amount);
    }

    function issueRefund(uint256 campaignId) external campaignExists(campaignId) notCompleted(campaignId) notFailed(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign is not yet completed");
        require(campaign.totalFunds < campaign.goal, "Campaign reached its goal");

        uint256 contribution = campaign.contributors[msg.sender];
        require(contribution > 0, "No contributions found");

        campaign.contributors[msg.sender] = 0;
        payable(msg.sender).transfer(contribution);

        emit RefundIssued(campaignId, msg.sender, contribution);
    }

    function getCampaignDetails(uint256 campaignId) external view campaignExists(campaignId) returns (uint256 goal, uint256 deadline, uint256 totalFunds, bool completed, bool failed) {
        Campaign storage campaign = campaigns[campaignId];
        return (campaign.goal, campaign.deadline, campaign.totalFunds, campaign.completed, campaign.failed);
    }

    function getContribution(uint256 campaignId) external view campaignExists(campaignId) returns (uint256) {
        return campaigns[campaignId].contributors[msg.sender];
    }
}
