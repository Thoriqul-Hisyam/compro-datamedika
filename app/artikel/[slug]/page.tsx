import { getPublicArticleBySlug, getPublicArticles } from "@/actions/article";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, User as UserIcon, ArrowLeft, Tag, Clock, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/public/ReadingProgressBar";
import ArticleActions from "@/components/public/ArticleActions";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article: any = await getPublicArticleBySlug(slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: `${article.metaTitle || article.title} - SIMRS.ID`,
    description: article.metaDescription || "Baca selengkapnya di SIMRS.ID",
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article: any = await getPublicArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const latestArticles = await getPublicArticles();
  const relatedArticles = latestArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  // Calculate estimated reading time
  const wordCount = article.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://simrs.id'}/artikel/${article.slug}`;

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20">
      <ReadingProgressBar />
      <Header />
      
      <main className="flex-grow pt-32 pb-20 section-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section: Article Header */}
          <div className="max-w-4xl mx-auto mb-10">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/artikel" className="hover:text-primary transition-colors">Artikel</Link>
              {article.categories.map((tc: any) => (
                <span key={tc.categoryId} className="flex items-center gap-2">
                  <ChevronRight size={12} />
                  <Link href={`/artikel?category=${tc.categoryId}`} className="text-primary hover:underline">{tc.category.name}</Link>
                </span>
              ))}
            </nav>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
              <span className="text-gradient">{article.title}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-slate-100">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                     <UserIcon size={20} />
                  </div>
                  <div>
                     <p className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none mb-1">{article.author.name}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Author</p>
                  </div>
               </div>
               <div className="h-8 w-px bg-slate-100 hidden sm:block" />
               <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={16} className="text-slate-300" />
                  <span className="text-xs font-bold uppercase tracking-widest">{new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
               </div>
               <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={16} className="text-slate-300" />
                  <span className="text-xs font-bold uppercase tracking-widest">{readingTime} MIN BACA</span>
               </div>
            </div>
          </div>

          {/* Section: Main Image */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="relative aspect-[21/9] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                  <Tag className="text-slate-200 w-24 h-24" />
                </div>
              )}
            </div>
          </div>

          {/* Section: Content Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* Left Column: Social Share (Sticky) */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-40">
                  <ArticleActions url={fullUrl} title={article.title} />
                </div>
              </div>

              {/* Main Column: Article Content */}
              <div className="lg:col-span-7 xl:col-span-8">
                <article className="prose prose-lg md:prose-xl prose-slate max-w-none 
                  prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                  prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:mb-8
                  prose-li:text-slate-600 prose-li:leading-[1.8]
                  prose-a:text-primary prose-a:font-black prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-12
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-slate-50 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:text-slate-700">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </article>

                {/* Mobile Social Share */}
                <div className="lg:hidden mt-16 pt-10 border-t border-slate-100 mb-10">
                  <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Bagikan Artikel</h4>
                  <ArticleActions url={fullUrl} title={article.title} />
                </div>
              </div>

              {/* Right Column: Sidebar */}
              <aside className="lg:col-span-4 xl:col-span-3 space-y-12">
                <div className="sticky top-40 space-y-12">
                  {/* Related News Widget */}
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <h3 className="font-black text-slate-900 uppercase tracking-wider text-sm mb-8 flex items-center gap-2">
                       <div className="w-1.5 h-6 bg-gradient-primary rounded-full" />
                       Update Lainnya
                    </h3>
                    <div className="space-y-8">
                      {relatedArticles.map((a) => (
                        <Link key={a.id} href={`/artikel/${a.slug}`} className="group block space-y-3">
                          <h4 className="font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {a.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <Calendar size={10} className="text-primary" />
                             {new Date(a.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                             <ChevronRight size={10} className="ml-auto text-primary group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link 
                      href="/artikel" 
                      className="inline-flex w-full items-center justify-center py-4 px-6 mt-8 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-all group"
                    >
                      Semua Artikel <ArrowLeft size={14} className="ml-2 rotate-180" />
                    </Link>
                  </div>
 
                   {/* Promo Banner Style Kompas (Matching Listing) */}
                  <div className="bg-gradient-cta rounded-[32px] p-8 text-white relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                     <h4 className="text-xl font-black mb-4 relative z-10 leading-tight">Implementasikan SIMRS.ID di RS Anda</h4>
                     <p className="text-white/80 text-xs font-medium leading-relaxed mb-6 relative z-10">
                         Tingkatkan efisiensi layanan dengan sistem manajemen rumah sakit terintegrasi.
                     </p>
                     <Link 
                        href="/#pricing" 
                        className="inline-flex w-full items-center justify-center py-4 px-6 rounded-2xl bg-white text-primary font-black text-xs hover:bg-slate-50 transition-all relative z-10 shadow-lg"
                      >
                         Hubungi Kami
                     </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
