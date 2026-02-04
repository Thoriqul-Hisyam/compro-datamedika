"use client";

import { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/actions/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Tag, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [isAutoSlug, setIsAutoSlug] = useState(true);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: isAutoSlug ? generateSlug(name) : prev.slug,
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, slug: e.target.value }));
    setIsAutoSlug(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setIsLoading(true);
    const data = await getCategories();
    setCategories(data);
    setIsLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = new FormData();
    form.append("name", formData.name);
    form.append("slug", formData.slug);

    if (editingId) {
      await updateCategory(editingId, form);
    } else {
      await createCategory(form);
    }

    resetForm();
    await loadCategories();
    setIsSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      await deleteCategory(id);
      await loadCategories();
    }
  }

  function handleEdit(category: any) {
    setEditingId(category.id);
    setFormData({ name: category.name, slug: category.slug });
    setIsAutoSlug(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setFormData({ name: "", slug: "" });
    setEditingId(null);
    setIsAutoSlug(true);
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2 pb-2 border-b border-slate-100 sm:border-0 sm:pb-0">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            Manajemen <span className="text-gradient">Kategori</span>
        </h1>
        <p className="text-slate-500 font-medium text-sm">Kelola kategori artikel untuk mempermudah pengelompokan konten.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-1">
          <Card className="shadow-xl border-slate-200 rounded-3xl sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                {editingId ? "Edit Kategori" : "Tambah Kategori"}
              </CardTitle>
              <CardDescription>
                {editingId ? "Ubah informasi kategori yang sudah ada." : "Buat kategori baru untuk artikel Anda."}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-semibold ml-1">Nama Kategori</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="Contoh: Tips Kesehatan"
                    required
                    className="rounded-2xl border-slate-200 focus:ring-primary focus:border-primary py-5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-slate-700 font-semibold ml-1 flex justify-between">
                    <span>Slug</span>
                    <button 
                        type="button" 
                        onClick={() => setIsAutoSlug(!isAutoSlug)}
                        className="text-[10px] text-primary font-bold uppercase hover:underline"
                    >
                        {isAutoSlug ? "Manual Edit" : "Auto Generate"}
                    </button>
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={handleSlugChange}
                    placeholder="tips-kesehatan"
                    required
                    className="rounded-2xl border-slate-200 focus:ring-primary focus:border-primary py-5 font-mono text-xs"
                  />
                </div>
                <div className="pt-2 flex flex-col gap-2">
                    <Button 
                        type="submit" 
                        className="w-full rounded-2xl py-6 font-bold bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/20"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : editingId ? (
                            "Simpan Perubahan"
                        ) : (
                            <>
                                Tambah Kategori
                                <Plus className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                    {editingId && (
                        <Button 
                            type="button" 
                            variant="ghost" 
                            className="w-full rounded-2xl py-6 font-semibold"
                            onClick={() => {
                                setEditingId(null);
                                setFormData({ name: "", slug: "" });
                            }}
                        >
                            Batal
                        </Button>
                    )}
                </div>
              </CardContent>
            </form>
          </Card>
        </div>

        {/* List Section */}
        <div className="md:col-span-2">
          <Card className="shadow-xl border-slate-200 rounded-3xl overflow-hidden min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Kategori</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Slug</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        <tr>
                            <td colSpan={3} className="py-20 text-center">
                                <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary opacity-20" />
                                <p className="mt-4 text-slate-400 font-medium">Memuat data...</p>
                            </td>
                        </tr>
                    ) : categories.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="py-20 text-center text-slate-400 font-medium">
                                Belum ada kategori yang ditambahkan.
                            </td>
                        </tr>
                    ) : (
                        categories.map((c) => (
                            <motion.tr 
                                key={c.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="group hover:bg-slate-50/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <Tag className="h-4 w-4" />
                                        </div>
                                        <span className="font-bold text-slate-900">{c.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-500">{c.slug}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5"
                                            onClick={() => handleEdit(c)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                                            onClick={() => handleDelete(c.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))
                    )}
                </AnimatePresence>
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}
