"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, Building2, CheckCircle2 } from "lucide-react";

// Placeholder for hospital logos
const partners = [
  "RSUD Ciluengsi", "RS NgoerahSun WAC", "RS Adhiyaksaa"
];

const reviews = [
  {
    name: "Robbyansyah",
    role: "IT",
    hospital: "RS Pusdikkes Jakarta",
    text: "SIMRS.ID sangat kompatibel dengan kebutuhan modern rumah sakit kami. Sistemnya intuitif, mudah dikustomisasi, dan sangat membantu efisiensi pelayanan medis.",
    tag: "Highly Recommended",
    initial: "R",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Rendika",
    role: "Kepala IT",
    hospital: "RS Mitra Medika",
    text: "Sudah 2 tahun berjalan dan performanya sangat stabil. Tim supportnya luar biasa responsif, setiap kendala teknis selalu diselesaikan dengan cepat.",
    tag: "Best Support",
    initial: "R",
    rating: 5,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Arbain",
    role: "Kepala Operasional",
    hospital: "RSUD Tanjabtim",
    text: "Fitur bridging BPJS-nya sangat seamless. Klaim jadi jauh lebih cepat dan minim error. Investasi terbaik untuk digitalisasi rumah sakit daerah.",
    tag: "BPJS Ready",
    initial: "A",
    rating: 5,
    gradient: "from-purple-500 to-indigo-500",
  },
];

export default function Reviews() {
  return (
    <section id="testimoni" className="py-20 lg:py-28 bg-slate-50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-0 px-4 py-1.5 text-sm font-medium">
              Buktikan Sendiri
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Dipercaya oleh <span className="text-gradient">Profesional Medis</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Bergabunglah dengan ratusan rumah sakit yang telah bertransformasi digital bersama SIMRS.ID
            </p>
          </motion.div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-20">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group overflow-hidden relative rounded-2xl">
                {/* Top decorative bar */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${review.gradient}`} />
                
                <CardContent className="p-8 flex flex-col h-full relative">
                  {/* Quote decoration */}
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-100 rotate-180 group-hover:text-slate-200/80 transition-colors duration-500" />

                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <blockquote className="text-slate-700 text-base leading-relaxed mb-8 flex-grow">
                    "{review.text}"
                  </blockquote>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.gradient} p-[2px] shadow-md`}>
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className={`font-bold text-lg bg-gradient-to-br ${review.gradient} bg-clip-text text-transparent`}>
                          {review.initial}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                        {review.name}
                      </h4>
                      <div className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                        <Building2 size={12} className="text-slate-400" />
                        {review.role}, {review.hospital}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tag */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 hidden lg:block">
                     <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 flex gap-1 items-center">
                       <CheckCircle2 size={10} /> {review.tag}
                     </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Partners Strip */}
        <div className="border-t border-slate-200 pt-16">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Telah Diimplementasikan Di
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {partners.map((partner, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="text-xl font-bold text-slate-400 hover:text-slate-600 cursor-default"
                >
                  {partner}
                </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
