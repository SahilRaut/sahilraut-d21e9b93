import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RedGrid } from "@/components/lab/RedGrid";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <RedGrid />
      <Header />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
