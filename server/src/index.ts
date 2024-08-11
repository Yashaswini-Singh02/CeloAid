import express from "express";
import campaignRouter from "./routes/campaign.routes";
import connectToDB from "./services/db_service";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/v1/campaign", campaignRouter);

connectToDB().then(() => {
  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
});
