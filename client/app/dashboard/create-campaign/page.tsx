"use client";
import CreateCampaignForm from "@/components/projects/create-project";
import { useAccount } from "wagmi";

const CreateCampaign: React.FC = () => {
  const { address } = useAccount();

  return (
    <>
      {address ? (
        <CreateCampaignForm address={address} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg font-medium text-center">
            Connect your wallet to create a campaign.
          </p>
        </div>
      )}
    </>
  );
};

export default CreateCampaign;
