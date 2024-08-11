import { Router } from 'express';
import {
  createCampaign,
  withdrawFunds,
  getCampaignDetails,
  getInvestors
} from '../controllers/campaign.controller';

const campaignRouter = Router();

campaignRouter.post('/', createCampaign);
campaignRouter.post('/:campaignId/withdraw', withdrawFunds);
campaignRouter.get('/:campaignId/details', getCampaignDetails);
campaignRouter.get('/:campaignId/investors', getInvestors);

export default campaignRouter;
