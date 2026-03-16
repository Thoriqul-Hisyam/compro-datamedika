export const dynamic = "force-dynamic";
import { getPublicCareers } from "@/actions/career";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, Clock, ArrowRight, Building2, Sparkles, Globe, Calendar, Search, Tag, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Karir & Peluang Kerja - SIMRS.ID",
  description: "Bergabunglah dengan tim inovatif kami untuk merevolusi layanan kesehatan di Indonesia.",
};

export default async function KarirListingPage() {
  const careers = await getPublicCareers();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-32 section-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center md:text-left mb-16 space-y-4">
             <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                Join Our Team
             </Badge>
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Bangun Masa Depan <span className="text-gradient">Kesehatan Digital</span>
             </h1>
             <p className="text-slate-500 font-medium max-w-2xl">
                Kami mencari talenta terbaik untuk berinovasi dan memberikan dampak positif bagi sistem kesehatan di seluruh Indonesia.
             </p>
          </div>

          <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
             <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Posisi Terbuka</h2>
                <p className="text-sm text-slate-500 font-medium">Temukan peran yang sesuai untuk Anda</p>
             </div>
             <div className="hidden sm:flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <Globe size={16} />
                Remote & Office Hybrid
             </div>
          </div>

          {careers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary/60">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Belum ada lowongan</h3>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">Saat ini belum ada posisi yang tersedia. Silakan cek kembali nanti.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {careers.map((job) => (
                <Link key={job.id} href={`/karir/${job.slug}`} className="group block focus:outline-none">
                  <Card className="border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row min-h-[160px]">
                        <div className="relative w-full md:w-72 aspect-video md:aspect-auto overflow-hidden bg-slate-50 shrink-0">
                           {job.image ? (
                              <Image 
                                src={job.image} 
                                alt={job.title} 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                              />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-200">
                                <Building2 size={48} strokeWidth={1.5} />
                              </div>
                           )}
                        </div>
                        <div className="flex-grow p-6 md:p-8 flex flex-col justify-center space-y-4">
                           <div className="flex flex-wrap gap-6">
                              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <Clock size={12} className="text-primary" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <MapPin size={12} className="text-secondary" />
                                {job.location}
                              </div>
                           </div>
                           <div className="space-y-2">
                              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                                {job.title}
                              </h3>
                              <p className="text-sm text-slate-500 line-clamp-2 max-w-2xl leading-relaxed">
                                {job.description.replace(/<[^>]*>/g, '').slice(0, 150)}...
                              </p>
                           </div>
                           <div className="pt-2 flex items-center text-primary font-bold text-xs gap-2 group-hover:gap-4 transition-all">
                               Apply Now
                               <ArrowRight size={14} className="transition-transform" />
                           </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
