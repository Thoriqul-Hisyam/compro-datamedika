"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon, Upload, Loader2, Tag, FileText, Globe, Save, Search, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import RichTextEditor from "./rich-text-editor";
import { motion } from "framer-motion";

export default function ArticleForm({
  action,
  categories,
  defaultValues,
}: any) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues?.image || null);
  const [isPending, startTransition] = useTransition();
  const [slug, setSlug] = useState(defaultValues?.slug || "");
  const [isAutoSlug, setIsAutoSlug] = useState(!defaultValues?.slug);
  const [content, setContent] = useState(defaultValues?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultValues?.categories?.map((tc: any) => tc.categoryId) || []
  );

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (isAutoSlug) {
      setSlug(generateSlug(title));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      try {
        const result = await action(formData, content);
        if (result?.success) {
          router.push("/articles");
        } else {
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Terjadi kesalahan saat menyimpan artikel.");
        setIsSubmitting(false);
      }
    });
  };

  return (
    <form action={action} onSubmit={handleSubmit} className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl border-slate-200 rounded-3xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-700 font-bold ml-1">Judul Artikel</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Tuliskan judul artikel yang menarik..."
                            defaultValue={defaultValues?.title}
                            required
                            onChange={handleTitleChange}
                            className="rounded-2xl border-slate-200 focus:ring-primary py-6 text-lg font-bold"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug" className="text-slate-700 font-semibold ml-1 flex justify-between">
                            <span>Slug URL</span>
                            <button 
                                type="button" 
                                onClick={() => setIsAutoSlug(!isAutoSlug)}
                                className="text-[10px] text-primary font-bold uppercase hover:underline"
                            >
                                {isAutoSlug ? "Manual Edit" : "Auto Generate"}
                            </button>
                        </Label>
                        <div className="relative">
                            <Input
                                id="slug"
                                name="slug"
                                placeholder="judul-artikel-anda"
                                value={slug}
                                onChange={(e) => {
                                    setSlug(e.target.value);
                                    setIsAutoSlug(false);
                                }}
                                required
                                className="rounded-2xl border-slate-200 focus:ring-primary pl-4 py-5 font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <Label className="text-slate-700 font-semibold ml-1">Konten Artikel</Label>
                        <RichTextEditor 
                            value={content} 
                            onChange={setContent} 
                            placeholder="Mulai menulis konten artikel Anda di sini..."
                        />
                        <input type="hidden" name="content" value={content} />
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
            <Card className="shadow-xl border-slate-200 rounded-3xl overflow-hidden lg:sticky lg:top-24">
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-900">
                            <ImageIcon className="h-4 w-4 text-primary" />
                            <span className="font-bold">Featured Image</span>
                        </div>
                        <div 
                            className="relative aspect-video w-full rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden bg-slate-50 group hover:border-primary/50 transition-colors cursor-pointer"
                            onClick={() => document.getElementById('article-image')?.click()}
                        >
                            {imagePreview ? (
                                <div className="relative w-full h-full">
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Upload className="text-white h-8 w-8" />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-4">
                                    <Upload className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                                    <p className="text-xs font-bold text-slate-500">Klik untuk upload</p>
                                </div>
                            )}
                            <input 
                                id="article-image" 
                                name="image"
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between text-slate-900">
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-primary" />
                                <span className="font-bold">Kategori Artikel</span>
                            </div>
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-bold">
                                {selectedCategories.length} Terpilih
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 p-1">
                            {categories.map((c: any) => {
                                const isSelected = selectedCategories.includes(c.id);
                                return (
                                    <button
                                        key={c.id}
                                        type="button"
                                        onClick={() => toggleCategory(c.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
                                            isSelected 
                                                ? "bg-primary/10 border-primary text-primary shadow-sm shadow-primary/10 scale-[1.02]" 
                                                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                                        }`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isSelected ? "bg-primary animate-pulse" : "bg-slate-300"}`} />
                                        {c.name}
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="ml-1"
                                            >
                                                <div className="w-1.5 h-1.5 rotate-45 border-r-2 border-b-2 border-primary" />
                                            </motion.div>
                                        )}
                                    </button>
                                );
                            })}
                            {/* Hidden inputs for form submission */}
                            {selectedCategories.map((id) => (
                                <input key={id} type="hidden" name="categoryIds" value={id} />
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium px-2 italic">
                            * Klik pada label kategori untuk memilih atau membatalkan pilihan.
                        </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-slate-900">
                            <Globe className="h-4 w-4 text-primary" />
                            <span className="font-bold">Status Publikasi</span>
                        </div>
                        <Select name="status" defaultValue={defaultValues?.status || "PUBLISHED"}>
                            <SelectTrigger className="rounded-2xl border-slate-200 py-6">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl shadow-xl border-slate-100">
                                <SelectItem value="DRAFT">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                                        <span>Draft / Simpan Saja</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="PUBLISHED">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span>Published / Tayangkan</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="ARCHIVED">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                        <span>Archived / Arsipkan</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-slate-900">
                            <Search className="h-4 w-4 text-primary" />
                            <span className="font-bold">SEO Optimization</span>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="metaTitle" className="text-[11px] font-bold text-slate-500 uppercase ml-1">Meta Title</Label>
                                <Input 
                                    id="metaTitle"
                                    name="metaTitle"
                                    placeholder="Judul untuk Google..."
                                    defaultValue={defaultValues?.metaTitle}
                                    className="rounded-xl border-slate-200 text-xs py-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="metaDescription" className="text-[11px] font-bold text-slate-500 uppercase ml-1">Meta Description</Label>
                                <Textarea 
                                    id="metaDescription"
                                    name="metaDescription"
                                    placeholder="Ringkasan konten untuk hasil pencarian..."
                                    defaultValue={defaultValues?.metaDescription}
                                    className="rounded-xl border-slate-200 text-xs min-h-[80px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full rounded-2xl py-7 text-lg font-bold bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/25 transition-all"
                        >
                            {isPending ? (
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            ) : (
                                <>
                                    <Save className="mr-2 h-5 w-5" />
                                    {defaultValues ? "Simpan Perubahan" : "Publikasikan Artikel"}
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </form>
  );
}
