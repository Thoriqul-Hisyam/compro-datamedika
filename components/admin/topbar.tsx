"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { LogOut, Bell, Search, User, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useState } from "react";

export default function Topbar({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const getInitials = (name: string) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "AD";
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebar isMobile onClose={() => setIsOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="relative group">
            
        </div>
      </div>

      <div className="flex items-center gap-6">
        

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{session?.name}</p>
              <p className="text-xs font-semibold text-slate-400 capitalize">{session?.role?.toLowerCase()}</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-white shadow-md ring-1 ring-slate-200">
            <AvatarFallback className="bg-gradient-primary text-white font-bold">
                {getInitials(session?.name || "")}
            </AvatarFallback>
          </Avatar>

          <form action={logout}>
            <Button 
                variant="outline" 
                size="sm"
                type="submit"
                className="rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all font-semibold"
            >
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
