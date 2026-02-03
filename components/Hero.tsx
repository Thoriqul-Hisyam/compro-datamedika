"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, ChevronLeft, ChevronRight, Cloud, RefreshCw, Smartphone, CheckCircle, Shield, FileText, Users, Activity, Link2, LayoutDashboard, Stethoscope } from "lucide-react";
import RequestDemoDialog from "@/components/RequestDemoDialog";

const heroSlides = [
  {
    id: 1,
    badges: [
      { icon: CheckCircle, label: "Terdaftar HKI" },
      { icon: Shield, label: "PSE Verified" },
      { icon: CheckCircle, label: "Satusehat Partner" },
    ],
    title: "Sistem Informasi",
    highlight: "Rumah Sakit",
    subtitle: "Modern & Terintegrasi",
    description: "SIMRS dengan fitur lengkap, teknologi terkini, terkoneksi dengan BPJS dan berbiaya sangat terjangkau.",
    stats: [
      { value: "100+", label: "Rumah Sakit" },
      { value: "24/7", label: "Support" },
      { value: "99.9%", label: "Uptime" },
    ],
    bgGradient: "from-purple-100 via-pink-50 to-fuchsia-100",
    illustration: {
      colors: "from-fuchsia-500 via-purple-500 to-pink-500",
      icon: LayoutDashboard,
    },
    cardIcon: Users,
    cardLabel: "Pasien Hari Ini",
    cardValue: "2,847",
    floatingLabel: "Integrasi BPJS",
    floatingType: "chart",
  },
  {
    id: 2,
    badges: [
      { icon: Cloud, label: "Cloud Based" },
      { icon: RefreshCw, label: "Real-time Sync" },
      { icon: Smartphone, label: "Mobile Ready" },
    ],
    title: "Manajemen",
    highlight: "Pasien",
    subtitle: "Lebih Mudah & Cepat",
    description: "Kelola data pasien dengan sistem terintegrasi. Rekam medis elektronik dan laporan real-time.",
    stats: [
      { value: "50K+", label: "Pasien/Bulan" },
      { value: "< 5s", label: "Response Time" },
      { value: "100%", label: "Data Aman" },
    ],
    bgGradient: "from-cyan-100 via-teal-50 to-cyan-100",
    illustration: {
      colors: "from-cyan-500 via-teal-500 to-emerald-500",
      icon: Stethoscope,
    },
    cardIcon: FileText,
    cardLabel: "Rekam Medis",
    cardValue: "12,450",
    floatingLabel: "Antrian Online",
    floatingType: "status",
  },
  {
    id: 3,
    badges: [
      { icon: CheckCircle, label: "BPJS Ready" },
      { icon: Activity, label: "INA-CBG" },
      { icon: Link2, label: "Auto Bridging" },
    ],
    title: "Integrasi",
    highlight: "BPJS Kesehatan",
    subtitle: "Seamless & Otomatis",
    description: "Terintegrasi penuh dengan BPJS Kesehatan. Proses klaim lebih cepat dan data akurat.",
    stats: [
      { value: "98%", label: "Approval Rate" },
      { value: "2x", label: "Lebih Cepat" },
      { value: "0%", label: "Error Rate" },
    ],
    bgGradient: "from-fuchsia-100 via-purple-50 to-pink-100",
    illustration: {
      colors: "from-violet-500 via-purple-500 to-indigo-500",
      icon: Activity,
    },
    cardIcon: CheckCircle,
    cardLabel: "Klaim Sukses",
    cardValue: "5,230",
    floatingLabel: "Bridging Status",
    floatingType: "connected",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const slide = heroSlides[currentSlide];

  // Auto-play slides
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 min-h-screen">
      {/* Animated Background with gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`}
        />
      </AnimatePresence>

      {/* Decorative Lines Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalLines" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(139,92,246,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>

        {/* Curved decorative lines */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-50" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path d="M1440 0 C1200 200 800 100 600 300 C400 500 200 400 0 600 L0 800 L1440 800 Z" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="2" />
          <path d="M1440 100 C1100 300 900 200 700 400 C500 600 300 500 0 700 L0 800 L1440 800 Z" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="1.5" />
        </svg>

        {/* Grid dots */}
        <div className="absolute top-20 left-10 grid grid-cols-6 gap-4 opacity-30">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          ))}
        </div>

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
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                {/* Feature badges */}
                <div className="flex flex-wrap items-center gap-3">
                  {slide.badges.map((badge, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border-slate-200 text-slate-600 hover:bg-white rounded-full shadow-sm"
                    >
                      <badge.icon size={14} className="mr-2 text-emerald-500" />
                      {badge.label}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                  {slide.title}{" "}
                  <span className="text-gradient">{slide.highlight}</span>
                  <br />
                  {slide.subtitle}
                </h1>

                {/* Description */}
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <RequestDemoDialog>
                    <Button
                      size="lg"
                      className="rounded-full px-8 text-base font-semibold bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/25 group"
                    >
                      Request Demo Gratis
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </RequestDemoDialog>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 text-base font-semibold border-2 border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white group"
                  >
                    <div className="bg-slate-100 p-1.5 rounded-full mr-2 group-hover:bg-slate-200 transition-colors">
                      <Play size={14} className="fill-slate-600 text-slate-600" />
                    </div>
                    Lihat Video
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 pt-6 mt-2">
                  {slide.stats.map((stat, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex flex-col"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <span className="text-2xl md:text-3xl font-bold text-slate-900">
                        {stat.value}
                      </span>
                      <span className="text-sm text-slate-500 font-medium">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Main image container - Abstract Illustration */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white aspect-[16/10]">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.illustration.colors} opacity-10`} />
                  
                  {/* Decorative Patterns */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/40 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
                  </div>

                  {/* Main Icon Illustration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${slide.illustration.colors} blur-[60px] opacity-20`} />
                      
                      {/* Icon container */}
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className={`relative w-32 h-32 rounded-3xl bg-gradient-to-br ${slide.illustration.colors} flex items-center justify-center shadow-lg transform rotate-3`}
                      >
                        <slide.illustration.icon className="w-16 h-16 text-white" />
                        
                        {/* Inner reflection */}
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl" />
                      </motion.div>

                      {/* Floating particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-3 h-3 rounded-full bg-gradient-to-br ${slide.illustration.colors}`}
                          animate={{
                            y: [0, -20, 0],
                            x: [0, i % 2 === 0 ? 10 : -10, 0],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3 + i,
                            delay: i * 0.5,
                          }}
                          style={{
                            top: `${i * 30}%`,
                            left: `${(i + 1) * 25}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Card - Left (Main stat) */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-16 left-4 lg:-left-4"
                >
                  <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <slide.cardIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">{slide.cardLabel}</p>
                        <p className="text-xl font-bold text-slate-900">{slide.cardValue}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Floating Card - Right */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-16 right-4 lg:-right-4"
                >
                  <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-slate-500 font-medium">{slide.floatingLabel}</p>
                      {slide.floatingType === "chart" && (
                        <div className="flex items-end gap-1 h-8">
                          {[40, 60, 45, 80, 55, 70].map((h, i) => (
                            <div 
                              key={i} 
                              className="w-2 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-sm"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      )}
                      {slide.floatingType === "status" && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-sm font-semibold text-slate-900">Active</span>
                        </div>
                      )}
                      {slide.floatingType === "connected" && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-sm font-semibold text-emerald-600">Connected</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Modern Carousel Navigation */}
        <div className="flex items-center justify-center gap-6 mt-16">
          {/* Prev Button */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          {/* Slide Indicators */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            {heroSlides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className="relative group"
              >
                <div className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-10 bg-gradient-primary"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`} />
                {idx === currentSlide && isAutoPlaying && (
                  <motion.div 
                    className="absolute top-0 left-0 h-2 bg-white/50 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4">
          <span className="text-lg font-bold text-slate-900">0{currentSlide + 1}</span>
          <span className="text-lg text-slate-400"> / 0{heroSlides.length}</span>
        </div>
      </div>
    </section>
  );
}
