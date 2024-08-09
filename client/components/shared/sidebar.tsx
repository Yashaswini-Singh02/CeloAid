import { useMemo } from "react";

export const Sidebar: React.FC = () => {
  const SidebarRoutes = useMemo(
    () => [
      {
        label: "Portfolio",
        href: "",
      },
      {
        label: "Transactions",
        href: "",
      },
      {
        label: "Buy/Sell",
        href: "",
      },
    ],
    []
  );

  return (
    <aside className="flex flex-col  h-screen bg-white text-navy-blue py-8 text-left">
      <h1 className="text-3xl px-20 border-b py-6">Logo</h1>
      <div className="flex flex-col text-2xl gap-y-2 border-b py-10 px-20">
        <p>Username</p>
        <p className="text-lg">Wallet Id</p>
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div className="text-2xl px-20 py-10">
          <ul className="flex flex-col gap-y-10">
            {SidebarRoutes.map(({ label, href }) => (
              <li key={href}>{label}</li>
            ))}
          </ul>
        </div>
        <button className="text-red-800 w-max px-20 text-2xl mb-8">
          Logout
        </button>
      </div>
    </aside>
  );
};
