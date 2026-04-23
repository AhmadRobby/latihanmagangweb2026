import { useState, useEffect } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GraduationCap, Wallet, ArrowRight, Loader2, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/authStore"

export default function DaftarPilihJalur() {
  useTitle("Pilih Jalur Pendaftaran");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { logout } = useAuthStore(); 


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePilihJalur = async (jalur: "Reguler" | "KIP") => {
    setIsLoading(jalur);
    
    try {
      /* //  JUST SIMULASI KODE API
      const response = await fetch("/api/pendaftaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jalur_pendaftaran: jalur }),
      });
      
      if (!response.ok) throw new Error("Gagal membuat pendaftaran");
      */

      // simulasi delay nunggu respon API (1.5 detik)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      localStorage.setItem("statusPendaftaran", "aktif");
      localStorage.setItem("jalurPilihan", jalur);
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Gagal memproses pilihan jalur. Coba lagi ya!");
    } finally {
      setIsLoading(null);
    }
  };

  return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl z-10">
        
        <div className="flex justify-start mb-6">
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className="text-slate-500 hover:text-red-600 hover:bg-red-50 px-3 transition-colors">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Pilih Jalur Pendaftaran
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-base">
            Silakan pilih jalur pendaftaran yang sesuai dengan kriteria Anda. Pastikan Anda membaca ketentuan masing-masing jalur sebelum melanjutkan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="relative overflow-hidden border border-slate-200 bg-white/80 backdrop-blur-sm hover:border-amber-400 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 group flex flex-col h-full">
            <CardHeader className="text-center pb-2 pt-8">
              <div className="mx-auto bg-amber-50 border border-amber-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-sm">
                <GraduationCap className="w-10 h-10 text-amber-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors">Jalur Reguler</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between text-center pb-8 px-6 lg:px-8">
              <div className="space-y-6 mb-8">
                <CardDescription className="text-base text-slate-600 leading-relaxed">
                  Jalur pendaftaran umum untuk seluruh calon mahasiswa baru tanpa syarat ekonomi khusus.
                </CardDescription>
                <ul className="text-sm text-slate-600 space-y-3 text-left bg-slate-50/50 border border-slate-100 p-5 rounded-xl">
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0 shadow-sm shadow-amber-500/50"></div>
                    Terbuka untuk semua lulusan SMA/SMK/Sederajat
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0 shadow-sm shadow-amber-500/50"></div>
                    Pembayaran UKT/SPP secara mandiri
                  </li>
                </ul>
              </div>
              
              <Button 
                onClick={() => handlePilihJalur("Reguler")}
                disabled={isLoading !== null}
                className="w-full bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20 h-14 text-lg font-semibold transition-all">
                {isLoading === "Reguler" ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Memproses...</>
                ) : (
                  <>Pilih Reguler <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* CARD KIP - ORANGE THEME */}
          <Card className="relative overflow-hidden border border-slate-200 bg-white/80 backdrop-blur-sm hover:border-orange-400 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 group flex flex-col h-full">
          <div className="absolute top-3 right-3 bg-orange-100 border border-orange-200 text-orange-700 text-[11px] font-semibold px-2 py-1 rounded-full shadow-sm">
          🌟 Beasiswa Pemerintah
          </div>
            <CardHeader className="text-center pb-2 pt-8">
              <div className="mx-auto bg-orange-50 border border-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-sm">
                <Wallet className="w-10 h-10 text-orange-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">Jalur KIP-Kuliah</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between text-center pb-8 px-6 lg:px-8">
              <div className="space-y-6 mb-8">
                <CardDescription className="text-base text-slate-600 leading-relaxed">
                  Jalur pendaftaran khusus bagi siswa berprestasi yang memiliki keterbatasan ekonomi.
                </CardDescription>
                <ul className="text-sm text-slate-600 space-y-3 text-left bg-slate-50/50 border border-slate-100 p-5 rounded-xl">
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0 shadow-sm shadow-orange-500/50"></div>
                    Wajib memiliki nomor pendaftaran KIP-K dari Kemdikbud
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0 shadow-sm shadow-orange-500/50"></div>
                    Bebas biaya pendidikan dan uang saku hingga lulus (jika lolos seleksi)
                  </li>
                </ul>
              </div>
              
              <Button 
                onClick={() => handlePilihJalur("KIP")}
                disabled={isLoading !== null}
                className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20 h-14 text-lg font-semibold transition-all">
                {isLoading === "KIP" ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Memproses...</>
                ) : (
                  <>Pilih KIP-Kuliah <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </Button>
            </CardContent>
          </Card>

        </div>
    </motion.div>
      </div>
);
}