"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Monitor } from "lucide-react";
import RequestDemoDialog from "@/components/RequestDemoDialog";

export default function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-cta relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Siap Transformasi Digital Rumah Sakit Anda?
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Jadwalkan konsultasi langsung dengan demo aplikasi gratis dari tim kami.
              Kami siap membantu Anda menemukan solusi terbaik.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <RequestDemoDialog>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base font-semibold bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white hover:border-white group"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Request Demo Gratis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </RequestDemoDialog>
              <RequestDemoDialog>
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-base font-semibold bg-slate-900 text-white hover:bg-slate-800"
                >
                  Hubungi Tim Sales
                </Button>
              </RequestDemoDialog>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm font-medium bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                PSE Terdaftar
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm font-medium bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Mitra Satusehat
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm font-medium bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                HKI 000483511
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
