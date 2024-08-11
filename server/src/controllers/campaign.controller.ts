import { Request, Response } from "express";
import { getContract } from "../services/provider_services";
import Campaign from "../models/campaign.model";

const contract = getContract();

export const createCampaign = async (req: Request, res: Response) => {
  const { goal, deadline, creator } = req.body;

  try {
    const tx = await contract.createCampaign(goal, deadline);
    await tx.wait();

    const campaignCount = await contract.campaignCount();

    const newCampaign = new Campaign({
      campaignId: campaignCount.toNumber(),
      creator,
      goal,
      deadline,
      completed: false,
      failed: false,
    });

    await newCampaign.save();

    res.status(201).json({ message: "Campaign created", transaction: tx });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const withdrawFunds = async (req: Request, res: Response) => {
  const { campaignId } = req.params;
  try {
    const tx = await contract.withdraw(campaignId);
    await tx.wait();

    await Campaign.findOneAndUpdate(
      { campaignId: Number(campaignId) },
      { completed: true }
    );

    res.status(200).json({ message: "Funds withdrawn", transaction: tx });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCampaignDetails = async (req: Request, res: Response) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Campaign.findOne({ campaignId: Number(campaignId) });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.status(200).json({ campaign });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getInvestors = async (req: Request, res: Response) => {
    const { campaignId } = req.params;
    try {
      const campaign = await Campaign.findOne({ campaignId: Number(campaignId) });
  
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
  
      res.status(200).json({ contributors: campaign.contributors });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
