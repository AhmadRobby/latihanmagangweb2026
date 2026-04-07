import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  CreditCard, 
  ArrowRight, 
  Activity,
  LogOut,
  Clock
} from "lucide-react";

// Tipe data untuk statistik
interface AdminStats {
  totalPendaftar: number;
  reguler: number;
  kip: number;
  menungguVerifikasi: number;
  menungguPembayaran: number;
  grafikPendaftar: { tanggal: string; jumlah: number }[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi pemanggilan API: GET /admin/stats
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Anggap ini adalah axios.get('/admin/stats')
        await new Promise(resolve => setTimeout(resolve, 800)); // Delay simulasi jaringan
        
        // Data balikan dari server
        const mockData: AdminStats = {
          totalPendaftar: 248,
          reguler: 184,
          kip: 64,
          menungguVerifikasi: 12,
          menungguPembayaran: 8,
          grafikPendaftar: [
            { tanggal: "18 Mei", jumlah: 12 },
            { tanggal: "19 Mei", jumlah: 25 },
            { tanggal: "20 Mei", jumlah: 18 },
            { tanggal: "21 Mei", jumlah: 35 },
            { tanggal: "22 Mei", jumlah: 42 },
            { tanggal: "23 Mei", jumlah: 28 },
            { tanggal: "24 Mei", jumlah: 50 },
          ]
        };
        setStats(mockData);
      } catch (error) {
        console.error("Gagal mengambil data statistik", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // Mencari nilai tertinggi untuk skala grafik Tailwind
  const maxPendaftar = Math.max(...stats.grafikPendaftar.map(d => d.jumlah));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* HEADER ADMIN */}
      <header className="bg-amber-600 border-b border-amber-700 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-lg shadow-inner">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Admin</h1>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="ghost" 
            className="text-amber-50 hover:text-white hover:bg-amber-700">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Overview Pendaftaran</h2>
          <p className="text-slate-500 mt-1">Pantau statistik penerimaan mahasiswa baru hari ini.</p>
        </div>

        {/* STATISTIK UTAMA (CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-sm border-slate-200 bg-white hover:border-amber-200 transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Pendaftar</p>
                <h3 className="text-3xl font-bold text-slate-900">{stats.totalPendaftar}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white hover:border-amber-200 transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Jalur Reguler</p>
                <h3 className="text-3xl font-bold text-slate-900">{stats.reguler}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white hover:border-amber-200 transition-colors">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Jalur KIP Kuliah</p>
                <h3 className="text-3xl font-bold text-slate-900">{stats.kip}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* GRAFIK PENDAFTAR */}
          <Card className="lg:col-span-2 shadow-sm border-slate-200">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-800">Grafik Pendaftar (7 Hari Terakhir)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 w-full">
                {stats.grafikPendaftar.map((item, index) => {
                  const heightPercent = (item.jumlah / maxPendaftar) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 group relative">
                      {/* Tooltip Hover */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {item.jumlah} Pendaftar
                      </div>
                      
                      {/* Bar Grafik */}
                      <div className="w-full max-w-[40px] bg-amber-100 group-hover:bg-amber-200 rounded-t-md relative flex items-end justify-center transition-colors">
                        <div 
                          className="w-full bg-amber-500 group-hover:bg-amber-600 rounded-t-md transition-all duration-700 ease-out" 
                          style={{ height: `${heightPercent}%` }}>
                        </div>
                      </div>
                      
                      {/* Label Tanggal */}
                      <span className="text-[10px] sm:text-xs font-medium text-slate-500 mt-3 whitespace-nowrap">
                        {item.tanggal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* SHORTCUTS / BUTUH PERHATIAN (KANAN) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-amber-500" /> Butuh Tindakan
            </h3>

            {/* Shortcut Verifikasi Dokumen */}
            <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-md">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-800 font-semibold">{stats.menungguVerifikasi} Pendaftar</p>
                      <p className="text-sm text-slate-500">Menunggu verifikasi berkas</p>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => alert("Navigasi ke halaman Review Dokumen")} 
                  variant="outline" 
                  className="w-full mt-4 text-amber-700 border-amber-200 hover:bg-amber-50">
                  Review Berkas <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Shortcut Konfirmasi Pembayaran */}
            <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-md">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-800 font-semibold">{stats.menungguPembayaran} Pendaftar</p>
                      <p className="text-sm text-slate-500">Menunggu konfirmasi bayar</p>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => alert("Navigasi ke halaman Konfirmasi Pembayaran")} 
                  variant="outline" 
                  className="w-full mt-4 text-orange-700 border-orange-200 hover:bg-orange-50">
                  Cek Pembayaran <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}