"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  return (
    <div className="h-screen p-24">
      <div className="flex flex-col gap-y-6 justify-center items-center">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 1 }}
          className=" text-7xl max-w-5xl tracking-wide text-pale-white font-bold"
        >
          Lorem ipsum dolor sit amet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 1 }}
          className="text-xl text-beige font-semibold tracking-widest max-w-3xl text-center"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod
        </motion.p>
        <Link href={"/dashboard"}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 1 }}
            className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-xl mt-4"
          >
            <span className="w-full h-full bg-gradient-to-br from-purple via-mauve to-dark-purple group-hover:from-dark-purple group-hover:via-mauve group-hover:to-purple absolute"></span>
            <span className="relative px-8 py-4 transition-all ease-out bg-dark-blue rounded-lg group-hover:bg-opacity-0 duration-400">
              <span className="relative text-white group-hover:text-navy-blue text-2xl font-semibold tracking-wide">
                Get Started
              </span>
            </span>
          </motion.button>
        </Link>
      </div>

      <Image
        className="animate-fade-in-bounce rounded-2xl mx-auto"
        src={"/assets/landing/hero.svg"}
        alt="investing"
        width={500}
        height={500}
      />
    </div>
  );
};
