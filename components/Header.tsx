"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import RequestDemoDialog from "@/components/RequestDemoDialog";

const navItems = [
  { title: "Beranda", href: "/" },
  { title: "Fitur", href: "/#features" },
  { title: "Keunggulan", href: "/#keunggulan" },
  { title: "Artikel", href: "/artikel" },
  { title: "Karir", href: "/karir" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/datamedika-logo.png"
              alt="SIMRS.ID Logo"
              width={40}
              height={40}
              className="h-10 w-auto group-hover:scale-105 transition-transform"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-foreground">
              SIMRS<span className="text-gradient">.ID</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent hover:bg-accent/50 text-foreground/80 hover:text-primary transition-colors font-medium"
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <RequestDemoDialog>
              <Button className="rounded-full px-6 font-semibold bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
                Request Demo
              </Button>
            </RequestDemoDialog>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-xl transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-screen border-border" : "max-h-0 border-transparent"
        )}
      >
        <div className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-lg font-medium px-4 py-3 rounded-lg hover:bg-accent hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
            <RequestDemoDialog>
              <Button className="w-full rounded-full py-5 font-semibold bg-gradient-primary">
                Request Demo
              </Button>
            </RequestDemoDialog>
          </div>
        </div>
      </div>
    </header>
  );
}
