"use client";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useAccount, useWriteContract } from "wagmi";
import { FundingContract } from "@/utils/constants/contract";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trimAddress } from "@/utils/functions/trim-address";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

export const ProjectDetails: React.FC = () => {
  const [campaign, setCampaign] = useState<any>({});
  const [campaignId, setCampaignId] = useState<string>("");
  const [contributionAmount, setContributionAmount] = useState<number>(0);
  const params = useSearchParams();
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const { toast } = useToast();

  useEffect(() => {
    const id = params.get("campaignId");
    console.log(id);
    setCampaignId(id!);
    const getProjectDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/campaign/${id}/details`
        );
        setCampaign(res.data.campaign);
      } catch (error: any) {
        console.error(error);
      }
    };

    getProjectDetails();
  }, [window]);

  const handleContribute = async () => {
    try {
      const id = Number(campaignId) - 1;
      const tx = await writeContractAsync({
        abi: FundingContract.ABI,
        address: FundingContract.ADDRESS,
        functionName: "fund",
        args: [id],
        value: BigInt(contributionAmount * 1e18),
      });

      const updateCampaign = await axios.put(
        `http://localhost:8080/api/v1/campaign/${campaignId}/contribute`,
        {
          campaignId: campaignId,
          amount: contributionAmount,
          action: "contribute",
          contributor_address: address,
        }
      );
      toast({
        title: "Contribution successful",
        description: "Your contribution has been successful.",
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <section className="mt-12 px-24">
      <div className="relative">
        <div className="fixed inset-0 bg-indigo/30 z-10 h-4/5 w-3/4 mx-auto left-80 top-20 rounded-md"></div>

        <div className="relative z-10 text-white px-10 top-12 py-4">
          <h1 className="text-4xl font-bold border-b py-4">{campaign.name}</h1>
          <div className="flex justify-between items-start mt-6">
            <p className="text-xl leading-relaxed max-w-2xl">
              {campaign.description}
              <div className="py-2 mt-10 flex flex-col gap-2">
                <div>
                  <h3 className="text-2xl font-bold">Statistics</h3>
                  <div className="flex flex-col mt-4">
                    <Progress
                      value={(campaign.totalFunds / campaign.goal) * 100}
                      className=""
                    />
                    <p className="text-md text-right mt-2">
                      {campaign.totalFunds} CELO raised of {campaign.goal} CELO
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Recent Contributors</h3>
                {campaign.contributors ? (
                  <>
                    {campaign.contributors?.map((contributor: any) => (
                      <div
                        key={contributor.address}
                        className="flex justify-between items-center mt-4"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-lg font-bold flex items-center gap-x-2">
                              {trimAddress(contributor.address)}
                              <Copy
                                size="16"
                                strokeWidth={3}
                                className="cursor-pointer text-gray-400"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    contributor.address
                                  );
                                  toast({
                                    title: "Address copied",
                                  });
                                }}
                              />
                            </p>
                          </div>
                        </div>
                        <p className="text-lg">{contributor.amount} CELO</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-md mt-4">No contributors yet</p>
                )}
              </div>
            </p>
            <div className="flex flex-col gap-6">
              <p>If you like this project, consider contributing to help it.</p>
              <Input
                className="bg-white/80"
                placeholder="Amount"
                type="number"
                min={0}
                value={contributionAmount}
                onChange={(e) => setContributionAmount(Number(e.target.value))}
                disabled={address === campaign.creator}
              />
              <Button
                className="bg-white/80 text-violet hover:text-white"
                size={"lg"}
                onClick={() => {
                  handleContribute();
                }}
                disabled={address === campaign.creator}
              >
                {address === campaign.creator
                  ? "You are the creator"
                  : "Contribute"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
