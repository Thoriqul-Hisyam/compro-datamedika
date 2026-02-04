"use client";

import { useState } from "react";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan, silakan coba lagi");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-fuchsia-100 p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 grid grid-cols-6 gap-4 opacity-30">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          ))}
        </div>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-4 flex flex-col items-center pt-8">
            <div className="flex items-center gap-2 mb-2 p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <Image src="/datamedika-logo.png" alt="Logo" width={150} height={35} className="h-auto w-auto" priority />
            </div>
            <div className="text-center space-y-1">
              <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
                Admin <span className="text-gradient">Login</span>
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Sistem Informasi Manajemen Rumah Sakit
              </CardDescription>
            </div>
          </CardHeader>
          <form action={handleSubmit}>
            <CardContent className="space-y-5 px-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700 rounded-2xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700 font-semibold ml-1">Username</Label>
                <div className="relative group">
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="admin"
                        required
                        disabled={isLoading}
                        className="rounded-2xl border-slate-200 bg-white/50 focus:bg-white focus:ring-primary focus:border-primary transition-all py-6"
                    />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" title="Password" className="text-slate-700 font-semibold">Password</Label>
                </div>
                <div className="relative group">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                        className="rounded-2xl border-slate-200 bg-white/50 focus:bg-white focus:ring-primary focus:border-primary transition-all py-6"
                    />
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-8 pb-10 pt-4">
              <Button 
                type="submit" 
                className="w-full rounded-2xl py-7 text-lg font-bold bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/25 group overflow-hidden relative" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Menghubungkan...
                  </>
                ) : (
                  <>
                    Masuk Ke Dashboard
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-8 text-slate-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Datamedika. Hak Cipta Dilindungi.
        </p>
      </motion.div>
    </div>
  );
}
