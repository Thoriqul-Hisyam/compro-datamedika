"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  Database,
  Key,
  Headphones,
  Infinity,
  HardDrive,
} from "lucide-react";

const advantages = [
  {
    icon: Code2,
    title: "Kode Program Terbuka",
    description: "Kode program tidak dikunci, RS dapat mengembangkan secara mandiri",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: Database,
    title: "Kepemilikan Database",
    description: "Database diberikan kepada RS untuk pengelolaan data yang fleksibel",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    icon: Key,
    title: "Kepemilikan Program",
    description: "Program SIMRS menjadi milik RS setelah selesai kontrak",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Headphones,
    title: "Support 24 Jam",
    description: "Tim support siap membantu Anda kapan saja dibutuhkan",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Infinity,
    title: "Unlimited User",
    description: "Tidak ada batasan jumlah pengguna untuk kemudahan operasional",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: HardDrive,
    title: "Backup Otomatis",
    description: "Sistem backup harian otomatis untuk keamanan data Anda",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

const integrations = [
  { name: "VClaim", color: "bg-rose-50 text-rose-600 border-rose-100" },
  { name: "EKlaim", color: "bg-amber-50 text-amber-600 border-amber-100" },
  { name: "Aplicare", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { name: "Siranap", color: "bg-sky-50 text-sky-600 border-sky-100" },
  { name: "Sisrute", color: "bg-violet-50 text-violet-600 border-violet-100" },
  { name: "Satusehat", color: "bg-teal-50 text-teal-600 border-teal-100" },
  { name: "PACS", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { name: "LIS", color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100" },
  { name: "HL7/FHIR", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
];

export default function About() {
  return (
    <section id="keunggulan" className="py-20 lg:py-28 bg-gradient-to-b from-cyan-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-600 font-medium text-sm mb-4 block">Komitmen Kami</span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-900 mb-6 leading-tight">
              Biaya Terjangkau,{" "}
              <span className="text-gradient">Teknologi Terkini</span>
            </h2>
            <p className="text-slate-600 mb-10 leading-relaxed max-w-lg">
              Dengan biaya yang sangat terjangkau, SIMRS.ID tetap menggunakan teknologi terkini untuk memberikan solusi prima bagi instansi kesehatan Anda.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {advantages.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Integrations Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border border-slate-100 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">
                  Integrasi Lengkap
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {integrations.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <div className={`px-4 py-3 rounded-full text-center text-sm font-medium border ${item.color} transition-all hover:scale-105 cursor-default`}>
                        {item.name}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <p className="text-center text-sm text-slate-500 leading-relaxed">
                  Terintegrasi dengan berbagai sistem menggunakan{" "}
                  <span className="text-cyan-600 font-medium">HL7</span>,{" "}
                  <span className="text-cyan-600 font-medium">API</span>,{" "}
                  <span className="text-cyan-600 font-medium">Share Database</span> &{" "}
                  <span className="text-cyan-600 font-medium">Share File</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
