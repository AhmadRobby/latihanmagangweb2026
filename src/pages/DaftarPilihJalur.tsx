import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GraduationCap, Wallet, ArrowRight, Loader2 } from "lucide-react";

export default function DaftarPilihJalur() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  useEffect(() => {
    const hasActiveRegistration = localStorage.getItem("statusPendaftaran");
    
    if (hasActiveRegistration === "aktif") {
      navigate("/daftar/form", { replace: true });
    }
  }, [navigate]);
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
      navigate("/daftar/form");
      
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Gagal memproses pilihan jalur. Coba lagi ya!");
    } finally {
      setIsLoading(null);
    }
  };

  return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Pilih Jalur Pendaftaran
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Silakan pilih jalur pendaftaran yang sesuai dengan kriteria Anda. Pastikan Anda membaca ketentuan masing-masing jalur sebelum melanjutkan.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="relative overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/10 group cursor-pointer flex flex-col h-full">
            <CardHeader className="text-center pb-2 pt-8">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-900">Jalur Reguler</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between text-center pb-8">
              <div className="space-y-4 mb-8">
                <CardDescription className="text-base text-slate-600">
                  Jalur pendaftaran umum untuk seluruh calon mahasiswa baru tanpa syarat ekonomi khusus.
                </CardDescription>
                <ul className="text-sm text-slate-500 space-y-2 text-left bg-slate-50 p-4 rounded-xl">
                  <li className="flex gap-2 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    Terbuka untuk semua lulusan SMA/SMK/Sederajat
                  </li>
                  <li className="flex gap-2 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    Pembayaran UKT/SPP secara mandiri
                  </li>
                </ul>
              </div>
              
              <Button 
                onClick={() => handlePilihJalur("Reguler")}
                disabled={isLoading !== null}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                {isLoading === "Reguler" ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Memproses...</>
                ) : (
                  <>Pilih Reguler <ArrowRight className="ml-2 w-5 h-5" /></>
                )}
              </Button>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-2 border-transparent hover:border-emerald-500 transition-all hover:shadow-xl hover:shadow-emerald-500/10 group cursor-pointer flex flex-col h-full">
            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
            Beasiswa Pemerintah
            </div>
            
            <CardHeader className="text-center pb-2 pt-8">
              <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wallet className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl text-emerald-900">Jalur KIP-Kuliah</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between text-center pb-8">
              <div className="space-y-4 mb-8">
                <CardDescription className="text-base text-slate-600">
                  Jalur pendaftaran khusus bagi siswa berprestasi yang memiliki keterbatasan ekonomi.
                </CardDescription>
                <ul className="text-sm text-slate-500 space-y-2 text-left bg-slate-50 p-4 rounded-xl">
                  <li className="flex gap-2 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                    Wajib memiliki nomor pendaftaran KIP-K dari Kemdikbud
                  </li>
                  <li className="flex gap-2 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                    Bebas biaya pendidikan hingga lulus (jika lolos seleksi)
                  </li>
                </ul>
              </div>
              
              <Button 
                onClick={() => handlePilihJalur("KIP")}
                disabled={isLoading !== null}
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg">
                {isLoading === "KIP" ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Memproses...</>
                ) : (
                  <>Pilih KIP-Kuliah <ArrowRight className="ml-2 w-5 h-5" /></>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
    </motion.div>
      </div>
);
}