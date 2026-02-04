import { getPublicCareerBySlug, getPublicCareers } from "@/actions/career";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock, ArrowLeft, Send, CheckCircle2, Building2, Globe, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career: any = await getPublicCareerBySlug(slug);
  if (!career) return { title: "Lowongan Tidak Ditemukan" };

  return {
    title: `${career.metaTitle || career.title} - Karir SIMRS.ID`,
    description: career.metaDescription || "Bergabunglah dengan tim kami di SIMRS.ID",
    openGraph: {
      title: career.metaTitle || career.title,
      description: career.metaDescription,
      images: career.image ? [career.image] : [],
    },
  };
}

export default async function KarirDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career: any = await getPublicCareerBySlug(slug);

  if (!career) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-32 section-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Breadcrumbs & Back Button */}
          <nav className="flex items-center gap-3 mb-10 overflow-x-auto no-scrollbar py-2">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Home</Link>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <Link href="/karir" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Karir</Link>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary truncate">Detail Posisi</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-12">
               <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                      <div className="bg-primary/10 text-primary px-4 py-2 rounded-2xl border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em]">
                          {career.type}
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 text-slate-500 px-4 py-2 rounded-2xl border border-slate-100 text-[10px] font-black uppercase tracking-widest">
                          <MapPin size={14} className="text-secondary" />
                          {career.location}
                      </div>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                    <span className="text-gradient">{career.title}</span>
                  </h1>
               </div>

               {career.image && (
                  <div className="relative aspect-video rounded-[48px] overflow-hidden shadow-2xl border-8 border-slate-50">
                    <Image
                      src={career.image}
                      alt={career.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
               )}

               <div className="space-y-12">
                  <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
                    prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                    prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:mb-8
                    prose-li:text-slate-600 prose-li:leading-[1.8]
                    prose-strong:text-slate-900 prose-strong:font-black
                    prose-ul:space-y-3 prose-ul:list-none prose-ul:p-0
                    prose-li:flex prose-li:items-start prose-li:gap-4 prose-li:before:content-none
                    ">
                    {/* Injecting check icons via CSS would be better, but let's just use the HTML safely */}
                    <div dangerouslySetInnerHTML={{ __html: career.description }} />
                  </div>
               </div>
            </div>

            {/* Sidebar / CTA Area */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-32 space-y-8">
                 {/* Apply Card */}
                <div className="bg-gradient-cta rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                   <h3 className="text-2xl font-black mb-6 relative z-10 leading-tight">Siap Bergabung dengan Kami?</h3>
                   <p className="text-white/80 text-sm font-medium mb-10 relative z-10 leading-relaxed">
                      Kami menantikan bakat dan inovasi Anda untuk membawa SIMRS.ID ke level berikutnya. Let&apos;s build the future together.
                   </p>
                   
                   <a 
                     href="https://wa.me/6285284005300" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-full flex items-center justify-center gap-4 bg-white text-primary font-black py-6 rounded-2xl hover:bg-slate-50 transition-all group relative z-10 shadow-xl"
                   >
                     Submit Your Profile
                     <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </a>
                   <p className="mt-4 text-[10px] text-center text-white/60 font-medium italic">
                        * Hanya kandidat yang sesuai yang akan dihubungi.
                    </p>
                </div>

                {/* Company Card */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-6">
                   
                   <h4 className="text-xl font-black text-slate-900">Tentang <span className="text-gradient">SIMRS.ID</span></h4>
                   <p className="text-slate-500 text-xs font-medium leading-[1.8]">
                      SIMRS.ID merupakan pionir dalam digitalisasi manajemen rumah sakit di Indonesia. Kami fokus pada teknologi yang mempermudah akses kesehatan bagi seluruh masyarakat.
                   </p>
                   <Link href="/#about" className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                      Learn more about us <ArrowLeft size={14} className="rotate-180" />
                   </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
