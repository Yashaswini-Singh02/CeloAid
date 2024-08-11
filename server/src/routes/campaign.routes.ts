import { Router } from "express";
import {
  createCampaign,
  withdrawFunds,
  getCampaignDetails,
  getInvestors,
  getAllCampaigns,
  updateTotalFunds
} from "../controllers/campaign.controller";

const campaignRouter = Router();

campaignRouter.post("/", createCampaign);
campaignRouter.post("/:campaignId/withdraw", withdrawFunds);
campaignRouter.get("/:campaignId/details", getCampaignDetails);
campaignRouter.get("/:campaignId/investors", getInvestors);
campaignRouter.get("/", getAllCampaigns);
campaignRouter.put("/:campaignId/contribute", updateTotalFunds);

export default campaignRouter;
