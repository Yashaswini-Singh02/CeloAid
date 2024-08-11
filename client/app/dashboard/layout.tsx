"use client";
import { Sidebar } from "@/components/shared/index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const Layout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const {address} = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.push("/dashboard");
    }
  }, [address]);

  return (
    <div className="flex bg-dark-blue max-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
