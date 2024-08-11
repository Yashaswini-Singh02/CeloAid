"use client";
import { useMemo } from "react";
import Image from "next/image";
import { Blockchain, Exchange, Funds } from "@icon-park/react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { trimAddress } from "@/utils/functions/trim-address";

export const Sidebar: React.FC = () => {
  const { address } = useAccount();

  const SidebarRoutes = useMemo(() => {
    if (address) {
      return [
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
      ];
    } else {
      return [];
    }
  }, [address]);

  return (
    <aside className="flex flex-col items-center justify-center bg-white/80 text-navy-blue py-16 text-left px-8 rounded-r-xl h-screen w-80">
      <div className="">
        <Image
          className=""
          src={"/assets/landing/logo.png"}
          alt=""
          height={100}
          width={100}
        />
      </div>

      <div className="flex flex-col text-center text-xl gap-y-2 border-dashed border-b-2 border-violet py-8">
        {address ? (
          <>
            <div className="text-lg">Welcome back,</div>
            <div>{trimAddress(address)}</div>
          </>
        ) : (
          <div className="text-base">
            Connect your wallet to start using the application
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow justify-between items-center">
        <div className="text-lg py-12">
          <ul className="flex flex-col gap-y-10 items-start">
            {SidebarRoutes.map(({ label, href, icon }) => (
              <li
                className="flex gap-x-3 max-w-60 min-w-60 items-center px-6 py-3 mx-4 rounded-lg group cursor-pointer transition-all ease-in-out delay-200 duration-700 bg-gradient-to-r hover:from-violet/40 hover:via-violet hover:to-violet/40"
                key={href}
              >
                {icon}
                <span className="group-hover:text-white">{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <ConnectButton chainStatus={"icon"} accountStatus={"avatar"} showBalance={false}/>
      </div>
    </aside>
  );
};
