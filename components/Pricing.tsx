"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import RequestDemoDialog from "@/components/RequestDemoDialog";

const pricingPlans = [
  {
    name: "Lite",
    subtitle: "Untuk klinik dan RS kecil",
    price: "Hubungi Kami",
    features: [
      "Modul Dasar Lengkap",
      "Integrasi BPJS",
      "5 User Termasuk",
      "Email Support",
      "Backup Harian",
    ],
    popular: false,
  },
  {
    name: "Professional",
    subtitle: "Untuk RS menengah",
    price: "Hubungi Kami",
    features: [
      "Semua Fitur Lite",
      "Unlimited User",
      "Kustomisasi Laporan",
      "Priority Support 24/7",
      "Integrasi Satusehat",
      "Training Onsite",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    subtitle: "Untuk RS besar & grup",
    price: "Hubungi Kami",
    features: [
      "Semua Fitur Professional",
      "Dedicated Support",
      "Kustomisasi Penuh",
      "Source Code Access",
      "SLA Guaranteed",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-1.5 text-sm font-medium">
              Paket Harga
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Pilih Paket{" "}
              <span className="text-gradient">Sesuai Kebutuhan</span>
            </h2>
            <p className="text-lg text-slate-600">
              Harga KSO (Kerja Sama Operasional) minimal 5 tahun dengan biaya sangat terjangkau
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-primary text-white border-0 px-4 py-1 text-xs font-semibold shadow-lg">
                    Paling Populer
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full transition-all duration-300 ${
                  plan.popular
                    ? "border-2 border-transparent bg-gradient-to-b from-primary/5 to-cyan-50/50 shadow-xl relative overflow-hidden before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-card before:-z-10 before:content-['']"
                    : "border border-slate-200 hover:border-primary/30 hover:shadow-lg bg-white"
                }`}
              >
                <CardHeader className="text-center pb-4 pt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500">{plan.subtitle}</p>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <div className="text-center mb-6">
                    <span className="text-2xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <Check
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            plan.popular ? "text-primary" : "text-green-500"
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <RequestDemoDialog className="w-full">
                    <Button
                      className={`w-full rounded-xl py-5 font-semibold transition-all ${
                        plan.popular
                          ? "bg-gradient-primary hover:opacity-90 text-white shadow-lg shadow-primary/25"
                          : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Hubungi Kami
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </RequestDemoDialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500">
          * Tersedia juga opsi Jual Putus License.{" "}
          <RequestDemoDialog>
            <button className="text-primary hover:underline">
              Hubungi tim kami
            </button>
          </RequestDemoDialog>{" "}
          untuk informasi lebih lanjut.
        </p>
      </div>
    </section>
  );
}
