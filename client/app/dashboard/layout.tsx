"use client";
import { Sidebar } from "@/components/shared/index";

const Layout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="flex bg-dark-blue">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
