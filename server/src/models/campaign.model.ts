import mongoose, { Schema, Document } from "mongoose";

interface IContributor {
  address: string;
  amount: number;
}

interface ICampaign extends Document {
  campaignId: number;
  creator: string;
  name: string;
  description: string;
  goal: number;
  deadline: Date;
  completed: boolean;
  failed: boolean;
  totalFunds: number;
  contributors: IContributor[];
}

const contributorSchema = new Schema<IContributor>({
  address: { type: String, required: true },
  amount: { type: Number, required: true },
});

const campaignSchema = new Schema<ICampaign>({
  campaignId: { type: Number, required: true, unique: true },
  creator: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  failed: { type: Boolean, default: false },
  totalFunds: { type: Number, default: 0 }, // Add totalFunds field
  contributors: {
    type: [contributorSchema],
    default: [],
  },
});

const Campaign = mongoose.model<ICampaign>("Campaign", campaignSchema);

export default Campaign;
