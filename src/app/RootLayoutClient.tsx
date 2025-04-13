"use client";

import { useMediaQuery } from "@/hooks/usemediaQuery";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layouts/Sidebar";
import Header from "@/components/layouts/Header";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={isMobile}
        />

        <main className="flex-1 overflow-auto bg-zinc-950/50 backdrop-blur-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
