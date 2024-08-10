"use client";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export const ProjectDetails: React.FC = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mt-12 px-24">
      <div className="relative">
        <div className="fixed inset-0 bg-indigo/30 z-10 h-4/5 w-3/4 mx-auto left-80 top-20 rounded-md"></div>

        <div className="relative z-10 text-white px-10 top-12 py-4">
          <h1 className="text-4xl font-bold border-b py-4">Project Name</h1>
          <div className="flex mt-8 justify-between px-6 items-center">
            <p className="mt-4 text-xl leading-relaxed max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              luctus urna sed urna ultricies ac tempor dui sagittis. In
              condimentum facilisis porta.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Vivamus luctus urna sed urna
              ultricies ac tempor dui sagittis. In condimentum facilisis porta.
            </p>
            <Image
              className="bg-white/80 rounded-2xl"
              src={"/assets/landing/coins.svg"}
              alt="project-photo"
              width={300}
              height={300}
            />
          </div>

          <div className="py-2">
            <h3 className="text-2xl font-bold">Statistics</h3>
            <div className="flex flex-col mt-4">
              <Progress value={progress} className="w-[40%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
