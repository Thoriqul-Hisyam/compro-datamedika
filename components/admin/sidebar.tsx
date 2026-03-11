"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const menus = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Artikel", href: "/articles", icon: FileText },
  { label: "Kategori Artikel", href: "/categories", icon: FileText },
  { label: "Karir", href: "/careers", icon: Briefcase },
  { label: "Landing Page", href: "/", icon: Settings },
  { label: "User", href: "/users", icon: Users },
];

export default function Sidebar({ className, isMobile, onClose }: { className?: string; isMobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "w-72 border-r border-slate-200 bg-white flex flex-col transition-all duration-300",
      isMobile ? "h-full w-full border-r-0" : "h-screen sticky top-0 hidden lg:flex",
      className
    )}>
      <div className="p-8 mb-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/datamedika-logo.png"
            alt="SIMRS.ID Logo"
            width={32}
            height={32}
            className="h-8 w-auto group-hover:scale-110 transition-transform"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            SIMRS<span className="text-gradient">.ID</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Menu Utama
        </p>
        {menus.map((menu) => {
          const isActive = pathname === menu.href || pathname.startsWith(menu.href + "/");
          return (
            <Link
              key={menu.href}
              href={menu.href}
              onClick={onClose}
              className={cn(
                "flex items-center justify-between group px-4 py-3 rounded-2xl transition-all duration-200",
                isActive
                  ? "bg-gradient-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <menu.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                <span className="font-semibold">{menu.label}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4 text-white/70" />}
            </Link>
          );
        })}
      </nav>

      
    </aside>
  );
}
