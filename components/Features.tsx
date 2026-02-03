"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Monitor,
  Calculator,
  BarChart3,
  Settings2,
  Cloud,
  Shield,
  Database,
} from "lucide-react";

const features = [
  {
    title: "Antrian Online",
    description: "Sistem antrian berbasis Android, iOS & web yang terintegrasi dengan Sistem JKN untuk pengalaman pasien yang lebih baik.",
    icon: Users,
  },
  {
    title: "Rekam Medis Elektronik",
    description: "Beralih ke paperless dengan sistem EMR modern. Terdaftar sebagai mitra resmi Satusehat.",
    icon: FileText,
  },
  {
    title: "Responsive Design",
    description: "Dapat dioperasikan dengan baik pada desktop, laptop, tablet ataupun smartphone kapan saja.",
    icon: Monitor,
  },
  {
    title: "Hitung Jasa Medis Otomatis",
    description: "Perhitungan jasa medis otomatis dengan rumus yang dapat disesuaikan dengan kebutuhan rumah sakit.",
    icon: Calculator,
  },
  {
    title: "Laporan RL Terintegrasi",
    description: "Mendukung format laporan RL 1-6 SIRS secara otomatis untuk kemudahan pelaporan.",
    icon: BarChart3,
  },
  {
    title: "Ready to Custom",
    description: "Siap melakukan kustomisasi sesuai dengan kebutuhan dan alur kerja rumah sakit Anda.",
    icon: Settings2,
  },
  {
    title: "Cloud Ready",
    description: "Mendukung cloud system, dapat diakses dimana saja dan kapan saja dengan keamanan terjamin.",
    icon: Cloud,
  },
  {
    title: "Keamanan Data",
    description: "Enkripsi password, SSL support, dan hak akses per group user untuk keamanan maksimal.",
    icon: Shield,
  },
  {
    title: "Multi Database Support",
    description: "Mendukung MySQL, PostgreSQL, SQL Server dan Oracle sesuai infrastruktur Anda.",
    icon: Database,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 section-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-1.5 text-sm font-medium">
              Fitur Lengkap
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Semua yang Anda Butuhkan dalam Satu{" "}
              <span className="text-gradient">Platform</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Dirancang khusus untuk memenuhi kebutuhan operasional rumah sakit modern dengan teknologi terkini.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
