import { ReactNode } from "react";

import Navbar from "./Navbar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 px-[50px] py-8 md:py-12">
        {children}
      </main>

      <div className="h-10 bg-[#F25C66]" />
    </div>
  );
}
