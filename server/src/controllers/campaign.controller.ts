import { Request, Response } from "express";
import { getContract } from "../services/provider_services";
import Campaign from "../models/campaign.model";

const contract = getContract();

export const createCampaign = async (req: Request, res: Response) => {
  const { name, description, goal, deadline, creator } = req.body;

  try {
    const campaignCount = await Campaign.find().countDocuments();

    const newCampaign = new Campaign({
      campaignId: campaignCount + 1,
      creator,
      name,
      description,
      goal,
      deadline,
      completed: false,
      failed: false,
    });

    await newCampaign.save();

    res
      .status(201)
      .json({ message: "Campaign created", campaign: newCampaign });
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
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getInvestors = async (req: Request, res: Response) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Campaign.findOne({ campaignId: Number(campaignId) });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.status(200).json({ contributors: campaign.contributors });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find();

    res.status(200).json({ campaigns });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTotalFunds = async (req: Request, res: Response) => {
  const { campaignId, amount, action, contributor_address } = req.body;

  try {
    const update = action === "contribute"
      ? {
          $inc: { totalFunds: amount },
          $push: {
            contributors: {
              address: contributor_address,
              amount: amount,
            },
          },
        }
      : action === "refund"
      ? {
          $inc: { totalFunds: -amount },
          $pull: {
            contributors: {
              address: contributor_address,
            },
          },
        }
      : null;

    if (!update) {
      return res.status(400).json({ error: "Invalid action specified" });
    }

    const campaign = await Campaign.findOneAndUpdate(
      { campaignId: Number(campaignId) },
      update,
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.status(200).json({ message: "Total funds updated", campaign });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
