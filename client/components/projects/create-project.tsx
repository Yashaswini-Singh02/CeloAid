"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCampaignSchema } from "@/utils/schema/project";
import { z } from "zod";
import { useWriteContract } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { FundingContract } from "@/utils/constants/contract";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const CreateCampaignForm = ({ address }: { address: string }) => {
  const { writeContractAsync } = useWriteContract();
  const router = useRouter();
  const { toast } = useToast();
  const campaignForm = useForm<z.infer<typeof createCampaignSchema>>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      name: "",
      description: "",
      goal: "0",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      creator: address,
    },
  });

  const onSubmit = async (values: z.infer<typeof createCampaignSchema>) => {
    console.log(values);
    try {
      await writeContractAsync({
        abi: FundingContract.ABI,
        address: FundingContract.ADDRESS,
        functionName: "createCampaign",
        args: [
          values.goal,
          Date.parse(new Date(values.deadline).toISOString()),
        ],
      });

      const response = await axios.post(
        "http://localhost:8080/api/v1/campaign/",
        values
      );

      toast({
        title: "Campaign created",
        description: "Your campaign has been created successfully.",
      });

      router.push(`/dashboard`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-6 px-10 mt-20">
      <h1 className="text-2xl font-bold">Create Campaign</h1>
      <Form {...campaignForm}>
        <form
          onSubmit={campaignForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={campaignForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Campaign 1" {...field} />
                </FormControl>
                <FormDescription>Name of your campaign.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={campaignForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description 1" {...field} />
                </FormControl>
                <FormDescription>
                  Describe your campaign in 500 words or less.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={campaignForm.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Amount of money you want to raise.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={campaignForm.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal text-gray-500"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Deadline for your campaign.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={campaignForm.control}
            name="creator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creator</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>Creator's wallet address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCampaignForm;
