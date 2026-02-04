"use client";

import { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "@/actions/article";
import Link from "next/link";
import { 
    Plus, 
    Search, 
    FileText, 
    Calendar, 
    User as UserIcon, 
    Pencil, 
    Trash2, 
    Loader2,
    ArrowUpRight,
    Filter,
    Image as ImageIcon,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ArticleListPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    setIsLoading(true);
    const data = await getArticles();
    setArticles(data);
    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      await deleteArticle(id);
      await loadArticles();
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2 border-b border-slate-100 sm:border-0 sm:pb-0">
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                Manajemen <span className="text-gradient">Artikel</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">Buat dan kelola konten edukasi kesehatan.</p>
        </div>
        <Link href="/articles/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto rounded-2xl py-6 px-6 font-bold bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-5 w-5" />
            Tulis Artikel
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Cari artikel..." 
            className="pl-11 rounded-2xl border-slate-200 bg-white focus:ring-primary py-6"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto rounded-2xl border-slate-200 font-semibold px-6 py-6 bg-white shrink-0">
            <Filter className="mr-2 h-4 w-4 text-slate-400" />
            Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
            <div className="py-20 text-center">
                <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary opacity-20" />
            </div>
        ) : articles.length === 0 ? (
            <Card className="p-16 text-center border-dashed border-2 bg-slate-50/50 rounded-3xl">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium italic">Belum ada artikel yang diterbitkan.</p>
            </Card>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {articles.map((a, idx) => (
                        <motion.div
                            key={a.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Card className="shadow-lg hover:shadow-2xl border-slate-100 transition-all duration-300 rounded-3xl overflow-hidden group h-full flex flex-col bg-white">
                                <CardContent className="p-0 flex-1 flex flex-col relative">
                                    {/* Article Image */}
                                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                                        {a.image ? (
                                            <Image 
                                                src={a.image} 
                                                alt={a.title} 
                                                fill 
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                                <ImageIcon className="h-12 w-12" />
                                            </div>
                                        )}
                                        <Badge 
                                            className={cn(
                                                "absolute top-4 right-4 rounded-full px-3 font-bold text-[9px] uppercase tracking-wider",
                                                a.status === "PUBLISHED" ? "bg-emerald-500 text-white border-none" :
                                                a.status === "DRAFT" ? "bg-slate-500 text-white border-none" :
                                                "bg-amber-500 text-white border-none"
                                            )}
                                        >
                                            {a.status}
                                        </Badge>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1">
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {a.categories.map((c: any) => (
                                                <Badge key={c.category.id} variant="secondary" className="bg-primary/5 text-primary border-primary/10 rounded-full px-3 text-[9px] uppercase font-bold tracking-widest">
                                                    {c.category.name}
                                                </Badge>
                                            ))}
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-4 leading-snug">
                                            {a.title}
                                        </h3>
                                        <div className="flex flex-col gap-2 text-slate-400 text-[11px] font-bold">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(a.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <UserIcon className="h-3.5 w-3.5" />
                                                By: {a.author?.name || "Admin"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Link href={`/articles/${a.id}/edit`}>
                                                <Button 
                                                    size="icon" 
                                                    variant="ghost" 
                                                    className="h-9 w-9 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button 
                                                size="icon" 
                                                variant="ghost" 
                                                className="h-9 w-9 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50"
                                                onClick={() => handleDelete(a.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Link href={`/artikel/${a.slug}`} target="_blank">
                                            <Button variant="ghost" size="sm" className="rounded-xl text-primary font-bold gap-1 group/btn px-3">
                                                Lihat
                                                <ArrowUpRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        )}
      </div>
    </div>
  );
}
