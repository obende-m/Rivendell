"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      <PageTransition>
        <main className="flex-grow">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  );
}
