"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, MessageCircle } from "lucide-react";

interface RequestDemoDialogProps {
  children?: React.ReactNode;
  className?: string; // Add className prop to support pass-through styling
}

export default function RequestDemoDialog({
  children,
  className,
}: RequestDemoDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    faskes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct WhatsApp message
    const message = `Halo tim Sales, saya tertarik demo aplikasi.\n\nNama: ${formData.name}\nEmail: ${formData.email}\nPerusahaan / Faskes: ${formData.faskes}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285284005300?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className={className}>Request Demo</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Demo Aplikasi</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk terhubung dengan tim sales kami via
            WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Lengkap *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Masukkan nama Anda"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="faskes">Perusahaan / Faskes *</Label>
            <Input
              id="faskes"
              name="faskes"
              placeholder="Nama Perusahaan / Faskes"
              value={formData.faskes}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Lanjut ke WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
