"use client";

import {
  Card,
  CardContent,
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
import { useMemo } from "react";
import Link from "next/link";
import {
  CollapseTextInput,
  HealthyRecognition,
  RightSmallUp,
  ToBottomOne,
} from "@icon-park/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProjectDetails {
  Project_Name: "string";
  Project_Description?: "string";
  Project_Content?: "string";
  Project_Link?: "string";
}

export const Projects: React.FC = () => {
  const ProjectDetails = useMemo(
    () => [
      {
        Project_Name: "Project Name",
        Project_Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Project_Content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta.",
        Project_Link: "/dashboard/project",
      },
    ],
    []
  );
  return (
    <section className="mt-12 px-24">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-xl text-white">
              <BreadcrumbLink href="/dashboard">
                Projects Overview
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white" />
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex py-8">
          {ProjectDetails.map(
            ({
              Project_Name,
              Project_Description,
              Project_Content,
              Project_Link,
            }) => (
              <Card key={Project_Name} className="w-96 h-max bg-pale-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-violet font-bold border-b-2 border-dashed border-indigo py-3">
                    {Project_Name}
                  </CardTitle>
                </CardHeader>
                <CardDescription className="text-gray-900 px-6 max-w-2xl text-md font-medium">
                  <p>{Project_Description}</p>
                </CardDescription>
                <CardFooter>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <button className="text-violet py-4 text-md font-light flex items-center gap-x-1">
                        Know more
                        <ToBottomOne
                          theme="outline"
                          size="20"
                          strokeWidth={3}
                        />
                      </button>
                    </DrawerTrigger>
                    <DrawerContent className="px-20">
                      <DrawerHeader>
                        <DrawerTitle className="text-navy-blue text-3xl">
                          {Project_Name}
                        </DrawerTitle>
                        <DrawerDescription className="max-w-2xl text-lg pt-4">
                          {Project_Content}
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter className="w-max text-lg">
                        <div className="w-full flex gap-x-12 items-center">
                          <Link href={Project_Link}>
                            <button className="flex items-center gap-x-2 text-white bg-navy-blue px-10 py-2 rounded-md">
                              Visit Project
                              <RightSmallUp theme="outline" size="24" />
                            </button>
                          </Link>
                          <Link href={"dashboard/billing"}>
                            <button className="text-white flex items-center gap-x-2 bg-dark-purple px-10 py-2 rounded-md">
                              Fund
                              <HealthyRecognition theme="outline" size="20" />
                            </button>
                          </Link>

                          <DrawerClose>
                            <button className="text-violet flex items-center gap-x-2 border-violet border-2 px-10 py-2 rounded-md">
                              Cancel{" "}
                              <CollapseTextInput theme="outline" size="20" />
                            </button>
                          </DrawerClose>
                        </div>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
};
