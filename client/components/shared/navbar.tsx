"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface NavbarRoutes {
  label: string;
  href: string;
}

export const Navbar: React.FC = () => {
  const NavbarRoutes = useMemo(
    () => [
      {
        label: "Learn",
        href: "",
      },
      {
        label: "Explore",
        href: "",
      },
    ],
    []
  );

  const path = usePathname();
  if (path.includes("/dashboard")) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 1 }}
      className="flex items-center text-white border-2 bg-gradient-to-r  bg-clip py-4 mt-8 px-10 w-max m-auto gap-x-12 text-2xl justify-between rounded-2xl"
    >
      <Image
        src={"/assets/landing/name-logo.png"}
        alt="BlocFund"
        height={100}
        width={140}
      />

      <ul className="flex gap-x-10">
        {NavbarRoutes.map(({ label, href }) => (
          <li className="" key={href}>
            {label}
          </li>
        ))}
      </ul>

      <div className="flex gap-x-10">
        <button>Connect</button>
      </div>
    </motion.nav>
  );
};
