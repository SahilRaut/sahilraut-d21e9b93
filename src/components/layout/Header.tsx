import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import sahilLogo from "@/assets/sahil-logo-original-white.png";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      {/* Faint scanline texture inside the bar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, hsl(var(--primary)) 0px, hsl(var(--primary)) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Glowing gradient bottom accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent shadow-[0_0_14px_hsl(var(--primary)/0.55)]"
      />
      {/* Cyan corner ticks */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-10 bg-[hsl(210_100%_60%)] shadow-[0_0_8px_hsl(210_100%_60%/0.8)]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-[2px] w-10 bg-[hsl(210_100%_60%)] shadow-[0_0_8px_hsl(210_100%_60%/0.8)]" />
      <div className="container relative flex h-16 items-center justify-between">

        {/* Left: Logo */}
        <Link
          to="/"
          aria-label="Sahil Raut — home"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="flex h-7 w-7 items-center justify-center md:h-9 md:w-9">
            <img
              src={sahilLogo}
              alt=""
              className="h-full w-full object-contain drop-shadow-[0_0_6px_hsl(var(--primary)/0.35)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_12px_hsl(var(--primary)/0.7)]"
            />
          </span>
        </Link>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="inline-block transition-colors"
            >
              <span
                className={cn(
                  "retro-text",
                  location.pathname === item.href && "retro-glow"
                )}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right: Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-background border-border">
            <div className="flex flex-col gap-6 mt-8">
            <div className="font-mono text-sm font-semibold uppercase tracking-wide text-primary mb-4">
              {"// Navigation"}
            </div>
            {navItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "font-mono text-lg font-semibold uppercase tracking-wide transition-colors hover:text-primary py-2",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
