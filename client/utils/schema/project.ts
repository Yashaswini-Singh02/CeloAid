import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z
    .string()
    .min(3, "Campaign name must be at least 3 characters long")
    .max(100, "Campaign name must be at most 100 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be at most 500 characters long"),
  goal: z
    .string()
    .refine((goal) => {
      return !isNaN(parseFloat(goal));
    }, "Goal must be a number")
    .refine((goal) => {
      return parseFloat(goal) > 0;
    }, "Goal must be greater than 0"),
  deadline: z.date(),
  creator: z.string().min(1, "Creator address is required"),
});
