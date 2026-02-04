"use client";

import { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Users, 
    Loader2, 
    Shield, 
    Mail, 
    Key,
    UserCheck,
    ArrowRight,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "ADMIN",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setIsLoading(true);
    try {
        const data = await getUsers();
        setUsers(data);
    } catch (error) {
        console.error("Failed to load users", error);
    }
    setIsLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
        if (editingId) {
            await updateUser(editingId, form);
        } else {
            await createUser(form);
        }
        setFormData({ name: "", username: "", password: "", role: "ADMIN" });
        setEditingId(null);
        setShowForm(false);
        await loadUsers();
    } catch (error: any) {
        alert(error.message || "Terjadi kesalahan");
    } finally {
        setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
        try {
            await deleteUser(id);
            await loadUsers();
        } catch (error: any) {
            alert(error.message || "Gagal menghapus user");
        }
    }
  }

  function handleEdit(user: any) {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      username: user.username,
      password: "", // Don't pre-fill password
      role: user.role,
    });
    setShowForm(true);
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2 border-b border-slate-100 sm:border-0 sm:pb-0">
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                Manajemen <span className="text-gradient">User</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">Kelola hak akses dan akun administrator sistem.</p>
        </div>
        <Button 
            onClick={() => {
                setEditingId(null);
                setFormData({ name: "", username: "", password: "", role: "ADMIN" });
                setShowForm(true);
            }} 
            className="w-full sm:w-auto rounded-2xl py-6 px-6 font-bold bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/20"
        >
            <Plus className="mr-2 h-5 w-5" />
            Tambah User
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-lg"
                >
                    <Card className="shadow-2xl border-white/20 bg-white/95 rounded-3xl overflow-hidden">
                        <CardHeader className="pt-8 px-8">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <UserCheck className="h-6 w-6 text-primary" />
                                    {editingId ? "Edit User" : "Tambah User"}
                                </CardTitle>
                                <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setShowForm(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <CardDescription className="text-sm font-medium">
                                {editingId ? "Update informasi akun user." : "Buat akun administrator baru untuk sistem."}
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-4 px-8 pt-4 pb-8">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-semibold ml-1">Nama Lengkap</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Contoh: Budi Santoso"
                                        required
                                        className="rounded-2xl border-slate-200 focus:ring-primary focus:border-primary py-5"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-semibold ml-1">Username</Label>
                                    <Input
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        placeholder="admin"
                                        required
                                        className="rounded-2xl border-slate-200 focus:ring-primary focus:border-primary py-5"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-semibold ml-1">
                                        Password {editingId && <span className="text-xs font-normal text-slate-400 ml-1">(Kosongkan jika tidak diubah)</span>}
                                    </Label>
                                    <Input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        required={!editingId}
                                        className="rounded-2xl border-slate-200 focus:ring-primary focus:border-primary py-5"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-semibold ml-1">Role Access</Label>
                                    <select 
                                        className="flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option value="ADMIN">Administrator</option>
                                        <option value="SUPERADMIN">Super Administrator</option>
                                    </select>
                                </div>
                                <div className="pt-4">
                                    <Button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full rounded-2xl py-7 text-lg font-bold bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/20"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        ) : (
                                            <>
                                                {editingId ? "Simpan Perubahan" : "Buat Akun Sekarang"}
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </form>
                    </Card>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
            <div className="col-span-full py-20 text-center">
                <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary opacity-20" />
            </div>
        ) : users.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-400 font-medium italic">
                Belum ada user yang terdaftar.
            </div>
        ) : (
            users.map((user) => (
                <Card key={user.id} className="shadow-lg hover:shadow-xl border-slate-100 transition-all rounded-3xl overflow-hidden group">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-md">
                                    <Users className="h-6 w-6" />
                                </div>
                                <Badge variant="secondary" className={cn(
                                    "rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-wider",
                                    user.role === "SUPERADMIN" ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-blue-100 text-blue-700 border-blue-200"
                                )}>
                                    {user.role}
                                </Badge>
                            </div>
                            
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{user.name}</h3>
                                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                    <UserCheck className="h-3.5 w-3.5" />
                                    {user.username}
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                                <span className="text-xs text-slate-400 font-medium">
                                    Dibuat: {new Date(user.createdAt).toLocaleDateString('id-ID')}
                                </span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5"
                                        onClick={() => handleEdit(user)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => handleDelete(user.id)}
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
