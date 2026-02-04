"use client";

import { useState, useEffect, useTransition } from "react";
import { getCareers, createCareer, updateCareer, deleteCareer } from "@/actions/career";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Briefcase, 
    Loader2, 
    MapPin, 
    Clock, 
    Image as ImageIcon,
    Upload,
    Search,
    Globe,
    FileText,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import RichTextEditor from "@/components/admin/rich-text-editor";

export default function CareersPage() {
  const [careers, setCareers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    location: "",
    type: "Full-time",
    status: "PUBLISHED",
    metaTitle: "",
    metaDescription: "",
  });
  const [isAutoSlug, setIsAutoSlug] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadCareers();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: isAutoSlug ? generateSlug(val) : prev.slug
    }));
  };

  async function loadCareers() {
    setIsLoading(true);
    const data = await getCareers();
    setCareers(data);
    setIsLoading(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value as string));
    if (selectedImage) {
      form.append("image", selectedImage);
    }

    startTransition(async () => {
      try {
        if (editingId) {
          await updateCareer(editingId, form);
        } else {
          await createCareer(form);
        }
        resetForm();
        await loadCareers();
      } catch (error) {
        console.error("Submission error:", error);
        alert("Terjadi kesalahan saat menyimpan lowongan.");
      }
    });
  }

  function resetForm() {
    setFormData({ 
        title: "", 
        slug: "", 
        description: "", 
        location: "", 
        type: "Full-time", 
        status: "PUBLISHED",
        metaTitle: "",
        metaDescription: ""
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingId(null);
    setIsAutoSlug(true);
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
      await deleteCareer(id);
      await loadCareers();
    }
  }

  function handleEdit(career: any) {
    setEditingId(career.id);
    setFormData({
      title: career.title,
      slug: career.slug,
      description: career.description,
      location: career.location,
      type: career.type,
      status: career.status,
      metaTitle: career.metaTitle || "",
      metaDescription: career.metaDescription || "",
    });
    setImagePreview(career.image || null);
    setIsAutoSlug(false);
    setShowForm(true);
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2 border-b border-slate-100 sm:border-0 sm:pb-0">
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                Manajemen <span className="text-gradient">Karir</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">Kelola lowongan pekerjaan dan peluang karir.</p>
        </div>
        <Button 
            onClick={() => { setShowForm(!showForm); resetForm(); }}
            className="w-full sm:w-auto rounded-2xl py-6 px-6 font-bold bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/20"
        >
          {showForm ? "Batal" : <><Plus className="mr-2 h-5 w-5" /> Tambah Lowongan</>}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {showForm ? (
            <motion.div
                key="career-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
            >
                <Card className="shadow-2xl border-slate-200 rounded-[40px] overflow-hidden">
                    <CardHeader className="p-8 md:p-12 bg-slate-50/50 border-b border-slate-100">
                        <CardTitle className="text-2xl font-black text-slate-900 leading-tight">
                            {editingId ? "Edit" : "Tambah"} <span className="text-gradient">Lowongan Kerja</span>
                        </CardTitle>
                        <CardDescription className="text-slate-500 font-medium mt-2">
                            Lengkapi informasi detail pekerjaan untuk menarik kandidat terbaik.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Grid Layout for Form */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-slate-700 font-bold text-sm ml-1 flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-primary" /> Nama Posisi Pekerjaan
                                        </Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => handleTitleChange(e.target.value)}
                                            placeholder="Contoh: Senior Frontend Developer"
                                            required
                                            className="rounded-2xl border-slate-200 focus:ring-primary py-6 text-lg font-bold"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-slate-700 font-bold text-sm ml-1 flex items-center gap-2 justify-between">
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-primary" /> URL Slug
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => setIsAutoSlug(!isAutoSlug)}
                                                className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline"
                                            >
                                                {isAutoSlug ? "Ubah Manual" : "Auto Generate"}
                                            </button>
                                        </Label>
                                        <Input
                                            value={formData.slug}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, slug: e.target.value }));
                                                setIsAutoSlug(false);
                                            }}
                                            placeholder="senior-frontend-developer"
                                            required
                                            className="rounded-2xl border-slate-200 focus:ring-primary py-6 font-mono text-xs"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-slate-700 font-bold text-sm ml-1 flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-primary" /> Lokasi
                                            </Label>
                                            <Input
                                                value={formData.location}
                                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                                placeholder="Jakarta / Remote"
                                                required
                                                className="rounded-2xl border-slate-200 focus:ring-primary py-6"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-slate-700 font-bold text-sm ml-1 flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-primary" /> Tipe Kontrak
                                            </Label>
                                            <select 
                                                className="w-full flex h-12 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                                value={formData.type}
                                                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                                            >
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Internship">Internship</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-slate-700 font-bold text-sm ml-1 flex items-center gap-2">
                                            <ImageIcon className="h-4 w-4 text-primary" /> Banner Media
                                        </Label>
                                        <div 
                                            className="relative aspect-video w-full rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden bg-slate-50 group hover:border-primary/50 transition-colors cursor-pointer"
                                            onClick={() => document.getElementById('image-upload')?.click()}
                                        >
                                            {imagePreview ? (
                                                <div className="relative w-full h-full">
                                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Upload className="text-white h-8 w-8" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center p-6">
                                                    <Upload className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                                                    <p className="text-xs font-bold text-slate-500">Klik untuk upload gambar</p>
                                                    <p className="text-[10px] text-slate-400 mt-1 italic">Rasio 16:9 disarankan</p>
                                                </div>
                                            )}
                                            <input 
                                                id="image-upload" 
                                                type="file" 
                                                accept="image/*" 
                                                className="hidden" 
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <Label className="text-slate-700 font-bold text-sm ml-1 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" /> Deskripsi Pekerjaan & Persyaratan
                                </Label>
                                <div className="min-h-[300px]">
                                    <RichTextEditor
                                        value={formData.description}
                                        onChange={(val: string) => setFormData(prev => ({ ...prev, description: val }))}
                                        placeholder="Detail pekerjaan, kualifikasi, dan tanggung jawab..."
                                    />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    onClick={() => setShowForm(false)}
                                    className="w-full sm:w-auto rounded-2xl py-6 px-8 text-slate-500 font-bold hover:bg-slate-50"
                                >
                                    Batal
                                </Button>
                                <Button 
                                    type="submit" 
                                    disabled={isPending}
                                    className="rounded-2xl px-8 font-bold bg-gradient-primary shadow-lg shadow-primary/20"
                                >
                                    {isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    ) : (
                                        <>{editingId ? "Simpan Perubahan" : "Tayangkan Lowongan"}</>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid gap-6">
        {isLoading ? (
            <div className="py-20 text-center">
                <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary opacity-20" />
            </div>
        ) : careers.length === 0 ? (
            <Card className="p-16 text-center border-dashed border-2 bg-slate-50/50 rounded-3xl">
                <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium italic">Belum ada lowongan pekerjaan.</p>
            </Card>
        ) : (
            careers.map((career) => (
                <Card key={career.id} className="shadow-lg hover:shadow-xl border-slate-100 transition-all rounded-3xl overflow-hidden group bg-white">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                            {career.image && (
                                <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden">
                                    <Image src={career.image} alt={career.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            )}
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{career.title}</h3>
                                                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 rounded-full px-3 text-[10px] uppercase font-bold tracking-wider">
                                                    {career.type}
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-slate-500">
                                                <div className="flex items-center gap-1.5 text-xs font-semibold">
                                                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                                    {career.location}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-semibold">
                                                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                                                    {new Date(career.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge 
                                            className={cn(
                                                "rounded-full px-3 font-bold text-[10px] uppercase tracking-wider",
                                                career.status === "PUBLISHED" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200" :
                                                career.status === "DRAFT" ? "bg-slate-100 text-slate-600 hover:bg-slate-100 border-slate-200" :
                                                "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200"
                                            )}
                                        >
                                            {career.status}
                                        </Badge>
                                    </div>
                                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                                        {career.description?.replace(/<[^>]*>/g, '')}
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-2 pt-4 border-t border-slate-50">
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5"
                                        onClick={() => handleEdit(career)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => handleDelete(career.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))
        )}
      </div>
    </div>
  );
}
