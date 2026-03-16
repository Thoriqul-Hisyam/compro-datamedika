import { getPublicArticles } from "@/actions/article";
import { getCategories } from "@/actions/category";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight, Tag, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Artikel & Berita - SIMRS.ID",
  description: "Dapatkan informasi terbaru seputar teknologi kesehatan dan perkembangan SIMRS.ID.",
};

export default async function ArtikelListingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category: categoryId, q: searchQuery } = await searchParams;
  const articles = await getPublicArticles(categoryId, searchQuery);
  const categories = await getCategories();

  const featuredArticles = articles.slice(0, 3);
  const remainingArticles = articles.slice(3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-20 section-light">
        {/* Section: Trending Topics Bar */}
        <div className="bg-slate-50 border-y border-slate-100 py-3 mb-10 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center gap-6">
            <div className="flex items-center gap-2 shrink-0">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Topik Hangat</span>
            </div>
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
               {categories.map((cat) => (
                 <Link key={cat.id} href={`/artikel?category=${cat.id}${searchQuery ? `&q=${searchQuery}` : ''}`} className="text-[10px] font-bold text-slate-500 hover:text-primary whitespace-nowrap uppercase tracking-widest transition-colors">
                    #{cat.name}
                 </Link>
               ))}
               {articles.slice(0, 3).map((a) => (
                 <Link key={a.id} href={`/artikel/${a.slug}`} className="text-[10px] font-bold text-slate-500 hover:text-primary whitespace-nowrap uppercase tracking-widest transition-colors hidden md:block">
                    #{a.title.split(' ')[0]}
                 </Link>
               ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section: Headline News */}
          {articles.length > 0 && (
            <section className="mb-16">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Main Headline */}
                <div className="lg:col-span-8 group">
                  <Link href={`/artikel/${featuredArticles[0].slug}`} className="block relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                    {featuredArticles[0].image ? (
                      <Image
                        src={featuredArticles[0].image}
                        alt={featuredArticles[0].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <Tag className="text-slate-300 w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                      <div className="flex gap-2 mb-4">
                        {featuredArticles[0].categories.map((tc) => (
                          <Badge key={tc.categoryId} className="bg-primary text-white border-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                            {tc.category.name}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-4 group-hover:text-primary transition-colors">
                        {featuredArticles[0].title}
                      </h2>
                      <div className="flex items-center gap-4 text-slate-300 text-xs font-bold uppercase tracking-widest">
                        <span>{featuredArticles[0].author.name}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{new Date(featuredArticles[0].createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Secondary Headlines */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  {featuredArticles.slice(1, 3).map((article) => (
                    <Link key={article.id} href={`/artikel/${article.slug}`} className="group relative flex-grow overflow-hidden rounded-3xl shadow-lg border border-slate-100 flex flex-col bg-white">
                      <div className="relative aspect-[16/8] overflow-hidden">
                        {article.image ? (
                          <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                            <Tag className="text-slate-200 w-10 h-10" />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                         <div className="flex gap-2 mb-2">
                           {article.categories.slice(0, 1).map((tc) => (
                             <span key={tc.categoryId} className="text-[10px] font-black text-primary uppercase tracking-widest">{tc.category.name}</span>
                           ))}
                         </div>
                         <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                         </h3>
                         <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-500">
                            {new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                         </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Section: News Feed & Sidebar */}
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column: Feed */}
            <div className="lg:col-span-8 space-y-12">
               <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h3 className="text-xl font-black text-slate-900 border-b-2 border-primary -mb-5 pb-4 uppercase tracking-wider">Berita Terbaru</h3>
               </div>

               {remainingArticles.length === 0 && articles.length <= 3 ? (
                 <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                   <p className="text-slate-500 font-medium">Lihat artikel kami lainnya segera.</p>
                 </div>
               ) : (
                 <div className="space-y-10">
                   {(remainingArticles.length > 0 ? remainingArticles : articles).map((article) => (
                     <Link key={article.id} href={`/artikel/${article.slug}`} className="group block focus:outline-none">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                           <div className="relative w-full md:w-56 aspect-[16/10] overflow-hidden rounded-2xl shadow-sm group-hover:shadow-md transition-all shrink-0">
                             {article.image ? (
                               <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                             ) : (
                               <div className="w-full h-full bg-slate-50 flex items-center justify-center"><Tag className="text-slate-200" /></div>
                             )}
                           </div>
                           <div className="flex-grow space-y-3">
                              <div className="flex items-center gap-3">
                                {article.categories.slice(0, 1).map((tc) => (
                                  <span key={tc.categoryId} className="text-[10px] font-black text-primary uppercase tracking-widest">{tc.category.name}</span>
                                ))}
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                              </div>
                              <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                                {article.title}
                              </h3>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                                {article.metaDescription || "Baca selengkapnya untuk mendapatkan informasi mendalam mengenai topik ini."}
                              </p>
                              <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                                Baca Selengkapnya <ArrowRight size={14} />
                              </div>
                           </div>
                        </div>
                     </Link>
                   ))}
                 </div>
               )}
            </div>

            {/* Right Column: Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              {/* Search Widget */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-gradient-primary rounded-full" />
                   Cari Berita
                </h4>
                <form action="/artikel" method="GET" className="relative group">
                   <input 
                      type="text" 
                      name="q"
                      defaultValue={searchQuery}
                      placeholder="Apa yang ingin Anda baca?" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12"
                   />
                   <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                      <Search size={20} />
                   </button>
                </form>
              </div>

              {/* Popular News Widget */}
             

              {/* Category Sidebar */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-gradient-primary rounded-full" />
                   Kebutuhan Informasi
                </h4>
                <div className="flex flex-col gap-2">
                   <Link href="/artikel" className={`flex items-center justify-between p-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${!categoryId ? 'bg-gradient-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-primary hover:text-primary'}`}>
                      Semua Berita <span>{articles.length}</span>
                   </Link>
                   {categories.map((cat) => (
                     <Link key={cat.id} href={`/artikel?category=${cat.id}${searchQuery ? `&q=${searchQuery}` : ''}`} className={`flex items-center justify-between p-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${categoryId === cat.id ? 'bg-gradient-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-primary hover:text-primary'}`}>
                        {cat.name} <span>→</span>
                     </Link>
                   ))}
                </div>
              </div>

               {/* Promo Banner Style Kompas */}
              <div className="bg-gradient-cta rounded-[32px] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                <h4 className="text-xl font-black mb-4 relative z-10 leading-tight">Siap Bergabung dengan Ekosistem Digital?</h4>
                <p className="text-white/80 text-xs font-medium leading-relaxed mb-6 relative z-10">
                   Jadilah bagian dari revolusi layanan kesehatan masa depan bersama tim SIMRS.ID.
                </p>
                <Link href="/karir" className="inline-flex w-full items-center justify-center py-4 px-6 rounded-2xl bg-white text-primary font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all relative z-10 shadow-lg">
                   Lihat Peluang Karir
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Button({ children, variant = "default", className = "", ...props }: any) {
  const variants: any = {
    default: "bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90",
    outline: "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary",
  };
  return (
    <button 
      className={`inline-flex items-center justify-center transition-all px-4 py-2 text-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
