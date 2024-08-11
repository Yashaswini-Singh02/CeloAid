import mongoose, { Schema, Document } from "mongoose";

interface IContributor {
  address: string;
  amount: number;
}

interface ICampaign extends Document {
  campaignId: number;
  creator: string;
  goal: number;
  deadline: number;
  completed: boolean;
  failed: boolean;
  contributors: IContributor[];
}

const contributorSchema = new Schema<IContributor>({
  address: { type: String, required: true },
  amount: { type: Number, required: true },
});

const campaignSchema = new Schema<ICampaign>({
  campaignId: { type: Number, required: true, unique: true },
  creator: { type: String, required: true },
  goal: { type: Number, required: true },
  deadline: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  failed: { type: Boolean, default: false },
  contributors: {
    type: [contributorSchema],
    default: [],
  },
});

const Campaign = mongoose.model<ICampaign>("Campaign", campaignSchema);

export default Campaign;
