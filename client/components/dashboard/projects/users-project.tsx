"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RightSmallUp, ToBottomOne } from "@icon-park/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "axios";
import { format } from "date-fns";
import { XIcon } from "lucide-react";
import { useAccount } from "wagmi";

interface ProjectDetails {
  name: string;
  description?: string;
  campaignId: number;
  deadline: string;
}

export const UserProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/campaign/").then((response) => {
      setProjects(
        response.data.campaigns.filter(
          (campaign: any) => campaign.creator === address
        )
      );
    });
  }, []);

  return (
    <section className="mt-12 px-24">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-xl text-white">
              <BreadcrumbLink>Your Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white" />
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-6 py-8">
          {projects.map(({ campaignId, deadline, description, name }) => (
            <Card
              key={campaignId}
              className="w-96 min-h-80 max-h-80 bg-pale-white flex flex-col"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-violet font-bold border-b-2 border-dashed border-indigo py-3">
                  {name}
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-gray-900 px-6 max-w-2xl max-h-40 text-md font-medium overflow-hidden">
                <p>{description}</p>
              </CardDescription>
              <CardFooter className="flex-1 items-end">
                <Drawer>
                  <DrawerTrigger asChild>
                    <button className="text-violet py-4 text-md font-light flex items-center gap-x-1">
                      Know more
                      <ToBottomOne theme="outline" size="20" strokeWidth={3} />
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="px-20">
                    <DrawerHeader>
                      <DrawerTitle className="text-navy-blue text-3xl">
                        {name}
                      </DrawerTitle>
                      <DrawerDescription className="max-w-2xl text-lg pt-4 flex flex-col gap-2">
                        {description}
                        <h6 className="text-violet text-lg font-bold">
                          Deadline:{" "}
                          {format(new Date(deadline), "dd/MM/yyyy hh:mm a")}
                        </h6>
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="w-max text-lg">
                      <div className="w-full flex gap-x-12 items-center">
                        <Link
                          href={`/dashboard/project?campaignId=${campaignId}`}
                        >
                          <button className="flex items-center gap-x-2 text-white bg-navy-blue px-10 py-2 rounded-md">
                            Visit Project
                            <RightSmallUp theme="outline" size="24" />
                          </button>
                        </Link>

                        <DrawerClose>
                          <button className="text-violet flex items-center gap-x-2 border-violet border-2 px-10 py-2 rounded-md">
                            Cancel <XIcon size="20" />
                          </button>
                        </DrawerClose>
                      </div>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
