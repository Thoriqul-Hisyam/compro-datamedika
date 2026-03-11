"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Wallet, 
  Clock, 
  Award, 
  TrendingUp, 
  Layers,
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Shield,
  Star,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock Dashboard Component for Hero
const DashboardMockup = () => {
  return (
    <div className="relative w-full aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 transform transition-transform hover:scale-[1.01] duration-500">
      {/* Top Bar */}
      <div className="h-8 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <div className="ml-4 h-4 w-32 bg-slate-700/50 rounded-full"></div>
      </div>
      
      {/* Content Layout */}
      <div className="flex h-full p-4 gap-4">
        {/* Sidebar */}
        <div className="w-14 flex flex-col gap-3 pt-2 border-r border-slate-800 pr-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-lg bg-slate-800/50 animate-pulse" style={{animationDelay: `${i * 100}ms`}}></div>
          ))}
        </div>
        
        {/* Main Area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-2">
            <div className="h-6 w-48 bg-slate-800/80 rounded-lg"></div>
            <div className="flex gap-2">
               <div className="h-8 w-8 rounded-full bg-primary/20"></div>
               <div className="h-8 w-24 rounded-lg bg-primary/40"></div>
            </div>
          </div>
          
          {/* Charts Area */}
          <div className="grid grid-cols-12 gap-4 h-36">
             <div className="col-span-4 rounded-lg bg-slate-800/30 border border-slate-700/30 p-3 flex flex-col justify-end">
                <div className="flex items-end h-20 gap-1 justify-between px-1">
                   {[40, 60, 45, 70, 50, 80, 60].map((h, i) => (
                      <div key={i} style={{ height: `${h}%` }} className="w-full bg-primary/60 rounded-t-sm hover:bg-primary/80 transition-colors"></div>
                   ))}
                </div>
             </div>
             <div className="col-span-8 rounded-lg bg-slate-800/30 border border-slate-700/30 p-3 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-4 border-slate-700/50 border-t-emerald-500/80 rotate-45"></div>
                </div>
             </div>
          </div>
          
          {/* Table Area */}
          <div className="flex-1 rounded-lg bg-slate-800/30 border border-slate-700/30 p-4 space-y-3">
             {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-700/30 pb-2 last:border-0">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-700/50"></div>
                      <div className="h-3 w-32 bg-slate-700/50 rounded"></div>
                   </div>
                   <div className="h-3 w-16 bg-slate-700/30 rounded"></div>
                </div>
             ))}
          </div>
        </div>
      </div>
      
      {/* Floating Badge (Whitelabel Indicator) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl flex flex-col items-center z-10">
         <div className="text-white/60 text-xs font-mono mb-2 uppercase tracking-widest">Powered by SIMRS.ID</div>
         <div className="text-3xl font-extrabold text-white tracking-widest drop-shadow-lg">YOUR BRAND</div>
      </div>
    </div>
  );
};

export default function WhitelabelPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    message: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "6285284005300";
    const text = `Halo, saya ${formData.name} dari ${formData.company} tertarik dengan program Whitelabel SIMRS.\n\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
    setIsDialogOpen(false);
  };
  
  const benefits = [
    {
      title: "Hemat Biaya",
      description: "Tanpa biaya riset dan pengembangan yang mahal. Langsung siap jual.",
      icon: Wallet,
    },
    {
      title: "Hemat Waktu",
      description: "Go-to-market lebih cepat. Produk sudah matang dan teruji.",
      icon: Clock,
    },
    {
      title: "Fasilitas HAKI",
      description: "Legalitas terjamin dengan HAKI atas nama brand Anda untuk kredibilitas.",
      icon: Award,
    },
    {
      title: "Ekspansi Bisnis",
      description: "Perluas portofolio produk Anda seketika tanpa tim teknis tambahan.",
      icon: TrendingUp,
    },
    {
      title: "Diversifikasi Produk",
      description: "Tawarkan solusi SIMRS lengkap melengkapi layanan Anda saat ini.",
      icon: Layers,
    }
  ];

  const ContactDialog = ({ 
    trigger, 
    customTitle = "Ajukan Kemitraan Whitelabel" 
  }: { 
    trigger: React.ReactNode, 
    customTitle?: string 
  }) => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{customTitle}</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk terhubung dengan tim kami via WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleWhatsAppRedirect} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Contoh: Budi Santoso" 
              required 
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Nama Perusahaan</Label>
            <Input 
              id="company" 
              name="company" 
              placeholder="Contoh: PT. Teknologi Maju" 
              required 
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Pesan Tambahan</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder="Tulis pesan atau pertanyaan Anda di sini..." 
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Kirim ke WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* HERO SECTION - Initialized with style from Hero.tsx */}
        <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
           {/* Background Gradient */}
           <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-100 via-purple-50 to-cyan-100 -z-20" />
           
           {/* Decorative Lines Pattern (replicated from Hero.tsx) */}
           <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
             <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <pattern id="diagonalLines" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                   <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(139,92,246,0.1)" strokeWidth="1" />
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#diagonalLines)" />
             </svg>
             
             {/* Floating circles */}
            <motion.div 
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute top-40 right-20 w-64 h-64 rounded-full border border-purple-200/50"
            />
            <motion.div 
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute bottom-20 left-40 w-80 h-80 rounded-full border border-cyan-200/50"
            />
           </div>

           <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                 
                 {/* Left Content */}
                 <div className="flex flex-col gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col gap-6"
                    >
                       {/* Badges */}
                       <div className="flex flex-wrap items-center gap-3">
                          <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border-slate-200 text-slate-600 rounded-full shadow-sm">
                             <CheckCircle size={14} className="mr-2 text-emerald-500" />
                             Official Partner
                          </Badge>
                          <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border-slate-200 text-slate-600 rounded-full shadow-sm">
                             <Shield size={14} className="mr-2 text-blue-500" />
                             White Label
                          </Badge>
                       </div>

                       {/* Title */}
                       <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                          Miliki Produk SIMRS <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">
                             Dengan Brand Sendiri
                          </span>
                       </h1>

                       {/* Description */}
                       <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                          Layanan Whitelabel memungkinkan Anda menjual kembali SIMRS canggih kami menggunakan identitas perusahaan Anda sepenuhnya. Tanpa coding, langsung jualan.
                       </p>

                       {/* Buttons */}
                       <div className="flex flex-col sm:flex-row gap-4">
                          <ContactDialog trigger={
                             <Button size="lg" className="rounded-full px-8 text-base font-semibold bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 shadow-lg shadow-purple-500/25">
                                Ajukan Kemitraan
                                <ArrowRight className="ml-2 w-4 h-4" />
                             </Button>
                          }/>
                          <ContactDialog customTitle="Pelajari Skema Whitelabel" trigger={
                             <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold border-2 border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white group">
                                <div className="bg-slate-100 p-1.5 rounded-full mr-2 group-hover:bg-slate-200 transition-colors">
                                   <Play size={14} className="fill-slate-600 text-slate-600" />
                                </div>
                                Pelajari Skema
                             </Button>
                          }/>
                       </div>
                       
                       {/* Stats/Trust */}
                       <div className="flex items-center gap-8 pt-4">
                          <div className="flex flex-col">
                             <span className="text-2xl font-bold text-slate-900">100+</span>
                             <span className="text-sm text-slate-500">Mitra Gabung</span>
                          </div>
                          <div className="w-px h-10 bg-slate-200"></div>
                          <div className="flex flex-col">
                             <span className="text-2xl font-bold text-slate-900">0 Biaya</span>
                             <span className="text-sm text-slate-500">Setup Awal</span>
                          </div>
                       </div>
                    </motion.div>
                 </div>

                 {/* Right Visual - Dashboard Mockup */}
                 <div className="relative perspective-1000">
                    <motion.div
                       initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                       animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                       transition={{ duration: 0.8 }}
                       className="relative"
                    >
                       {/* Background Glows for visual */}
                       <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 blur-3xl rounded-full transform scale-90 -z-10"></div>
                       
                       <DashboardMockup />

                       {/* Floating Element 1 - Profit */}
                       <motion.div 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                          className="absolute -right-6 top-10"
                       >
                          <Card className="p-3 bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl flex items-center gap-3">
                             <div className="p-2 bg-emerald-100 rounded-full">
                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                             </div>
                             <div>
                                <p className="text-xs text-slate-500 font-bold">Profit Margin</p>
                                <p className="text-lg font-bold text-slate-900">High</p>
                             </div>
                          </Card>
                       </motion.div>
                       
                       {/* Floating Element 2 - HAKI */}
                       <motion.div 
                          animate={{ y: [0, 10, 0] }}
                          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                          className="absolute -left-6 bottom-10"
                       >
                          <Card className="p-3 bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl flex items-center gap-3">
                             <div className="p-2 bg-blue-100 rounded-full">
                                <Award className="w-5 h-5 text-blue-600" />
                             </div>
                             <div>
                                <p className="text-xs text-slate-500 font-bold">Lisensi</p>
                                <p className="text-lg font-bold text-slate-900">Resmi</p>
                             </div>
                          </Card>
                       </motion.div>
                    </motion.div>
                 </div>
              </div>
           </div>
        </section>

        {/* BENEFITS SECTION - Styled like Features.tsx */}
        <section className="py-20 lg:py-28 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
               >
                   <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-1.5 text-sm font-medium">
                      Keunggulan
                   </Badge>
                   <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                     Mengapa Memilih Whitelabel?
                   </h2>
                   <p className="text-lg text-slate-600">
                     Akselerasi pertumbuhan bisnis IT kesehatan Anda dengan pondasi teknologi yang sudah teruji.
                   </p>
               </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group bg-white">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                        <benefit.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {/* Call to Action Card in Grid */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-purple-600 to-cyan-500 text-white relative overflow-hidden group">
                     {/* Decorative background */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                     <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full relative z-10">
                        <div className="mb-4 p-3 bg-white/20 rounded-full backdrop-blur-sm">
                           <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Siap Sukses?</h3>
                        <p className="text-white/90 mb-6 text-sm">
                           Jadilah bagian dari revolusi digital kesehatan Indonesia sekarang juga.
                        </p>
                        <ContactDialog trigger={
                           <Button className="w-full bg-white text-purple-600 hover:bg-slate-100 rounded-full font-bold shadow-lg">
                              Hubungi Kami
                           </Button>
                        }/>
                     </CardContent>
                  </Card>
                </motion.div>
            </div>
          </div>
        </section>

        {/* CTA SECTION - Styled like CTA.tsx */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
           {/* Background decoration */}
           <div className="absolute inset-0 opacity-30 pointer-events-none">
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
             <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
           </div>

           <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="text-center max-w-3xl mx-auto">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5 }}
               >
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                   Mulai Bisnis SIMRS Anda Hari Ini
                 </h2>
                 <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                   Peluang tidak datang dua kali. Dapatkan akses ke teknologi rumah sakit terbaik dengan merek Anda sendiri.
                 </p>

                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                   <ContactDialog trigger={
                      <Button
                        size="lg"
                        className="rounded-full px-8 py-6 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 shadow-lg group"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Hubungi Tim Whitelabel
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                   }/>
                 </div>
               </motion.div>
             </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
