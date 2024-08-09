"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

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
    <nav className="flex border-white/50 border py-6 mt-8 px-12 m-auto w-max gap-x-10 justify-between rounded-2xl text-xl">
      <h1>Logo</h1>
      <div>
        <ul className="flex gap-x-10">
          {NavbarRoutes.map(({ label, href }) => (
            <li className="" key={href}>
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-x-10">
        <button>Connect</button>
      </div>
    </nav>
  );
};
