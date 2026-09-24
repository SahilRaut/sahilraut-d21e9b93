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
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container relative flex h-16 items-center justify-between">
        {/* Left: Logo + styled name */}
        <Link
          to="/"
          aria-label="Sahil Raut — home"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <span className="flex h-10 w-10 items-center justify-center">
            <img src={sahilLogo} alt="" className="h-full w-full object-contain" />
          </span>
          <span className="font-display text-lg uppercase leading-none tracking-tighter text-foreground md:text-xl">
            Sahil Raut
          </span>
        </Link>

        {/* Right: Desktop Navigation with red retro accents */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "group font-mono text-sm transition-colors link-underline",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <span className="mr-1.5 text-primary/70 transition-colors group-hover:text-primary">
                {String(i + 1).padStart(2, "0")}.
              </span>
              {item.label}
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
              <div className="font-mono text-sm text-primary mb-4">
                {"// Navigation"}
              </div>
              {navItems.map((item, i) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "font-mono text-lg transition-colors hover:text-primary py-2",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-primary mr-2">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
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
