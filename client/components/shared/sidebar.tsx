"use client";
import { useMemo } from "react";
import Image from "next/image";
import { Blockchain, Exchange, Funds } from "@icon-park/react";

export const Sidebar: React.FC = () => {
  const SidebarRoutes = useMemo(
    () => [
      {
        icon: (
          <Blockchain
            theme="outline"
            size="24"
            className="text-navy-blue group-hover:text-white "
          />
        ),
        label: "Portfolio",
        href: "",
      },
      {
        icon: (
          <Exchange
            theme="outline"
            size="24"
            className="text-navy-blue group-hover:text-white"
          />
        ),
        label: "Transactions",
        href: "",
      },
      {
        icon: (
          <Funds
            theme="outline"
            size="24"
            className="text-navy-blue group-hover:text-white"
          />
        ),
        label: "Buy/Sell",
        href: "",
      },
    ],
    []
  );

  return (
    <aside className="flex flex-col items-center justify-center mt-20 ml-12 bg-white/80 text-navy-blue py-16 text-left px-8 rounded-xl">
      <div className="">
        <Image
          className=""
          src={"/assets/landing/logo.png"}
          alt=""
          height={100}
          width={100}
        />
      </div>

      <div className="flex flex-col text-center text-3xl gap-y-2 border-dashed border-b-2 border-violet py-8">
        <p>Username</p>
        <p className="text-lg">Wallet Id</p>
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div className="text-2xl py-12">
          <ul className="flex flex-col gap-y-10">
            {SidebarRoutes.map(({ label, href, icon }) => (
              <li
                className="flex gap-x-3 items-center px-6 py-3 rounded-lg group cursor-pointer transition-all ease-in-out delay-200 duration-700 bg-gradient-to-r hover:from-violet/40 hover:via-violet hover:to-violet/40"
                key={href}
              >
                {icon}
                <span className="group-hover:text-white">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
