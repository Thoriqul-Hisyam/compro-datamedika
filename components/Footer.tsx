"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, MessageCircle } from "lucide-react";
import RequestDemoDialog from "@/components/RequestDemoDialog";

const footerLinks = {
  produk: [
    { label: "Fitur", href: "#features" },
    { label: "Harga", href: "#pricing" },
    { label: "Demo", href: "#" },
    { label: "Dokumentasi", href: "#" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "/#keunggulan" },
    { label: "Karir", href: "/karir" },
    { label: "Artikel", href: "/artikel" },
    { label: "Kontak", href: "https://wa.me/6285284005300" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/datamedika-white.png"
                alt="SIMRS.ID Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                SIMRS<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400">.ID</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Sistem Informasi Rumah Sakit dengan fitur lengkap, teknologi terkini,
              terkoneksi dengan BPJS dan berbiaya sangat terjangkau.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-cyan-500 flex-shrink-0" />
                <span>Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-cyan-500 flex-shrink-0" />
                <a href="mailto:info@simrs.id" className="hover:text-cyan-400 transition-colors">
                  info@simrs.id
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="text-cyan-500 flex-shrink-0" />
                <a href="https://wa.me/6285284005300" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  +62 852-8400-5300
                </a>
              </li>
            </ul>
          </div>

          {/* Produk */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produk</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.produk.map((link) => (
                <li key={link.label}>
                  {link.label === "Demo" ? (
                    <RequestDemoDialog>
                      <button className="hover:text-cyan-400 transition-colors text-left">
                        {link.label}
                      </button>
                    </RequestDemoDialog>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  {link.label === "Kontak" ? (
                    <RequestDemoDialog>
                      <button className="hover:text-cyan-400 transition-colors text-left">
                        {link.label}
                      </button>
                    </RequestDemoDialog>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SIMRS.ID. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Partner/certification logos placeholder */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <img
                src="https://simrs.id/wp-content/uploads/2023/02/pse-terdaftar-150x150.png"
                alt="PSE Terdaftar"
                className="h-10 opacity-70 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://simrs.id/wp-content/uploads/2023/07/satset-150x150.png"
                alt="Satusehat"
                className="h-10 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
