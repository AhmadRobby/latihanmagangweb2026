import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  CreditCard, 
  GraduationCap,
  Hash,
  BookOpen,
  ChevronRight,
  LogOut,
  ClipboardList,
  ArrowLeft
} from "lucide-react";
import { useTitle } from "@/hooks/useTitle";
import NotificationBell from "@/components/NotificationBell";

type RegistrationStatus = "DRAFT" | "SUBMITTED" | "SELEKSI" | "REVIEW" | "REVISI" | "MENUNGGU_PEMBAYARAN" | "VERIFIKASI_PEMBAYARAN" | "DITERIMA";

export default function DashboardMahasiswa() {
useTitle("Halaman Calon Mahasiswa"); 
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); 
  const [isLoading, setIsLoading] = useState(true);
  
  const [data, setData] = useState({
    name: "",
    personalEmail: "",
    regNumber: "",
    track: "Memuat jalur...",
    status: "DRAFT" as RegistrationStatus,
    rejectionNote: "Scan Ijazah/SKL buram dan terpotong. Mohon upload ulang dokumen yang lebih jelas.",
    nim: "",
    campusEmail: ""
  });

  useEffect(() => {
    (window as any).ubahData = setData;
  }, []);

  const savedJalur = localStorage.getItem("jalurPilihan") || "Reguler";
  const isKIP = savedJalur === "KIP";

  const stepsReguler = [
    { id: "DRAFT", label: "Isi Formulir", icon: FileText },
    { id: "SUBMITTED", label: "Submit Berkas", icon: FileText },
    { id: "REVIEW", label: "Persetujuan", icon: Clock },
    { id: "MENUNGGU_PEMBAYARAN", label: "Pembayaran", icon: CreditCard },
    { id: "DITERIMA", label: "Selesai", icon: GraduationCap },
  ];

  const stepsKIP = [
    { id: "DRAFT", label: "Isi Formulir", icon: FileText },
    { id: "SUBMITTED", label: "Submit Berkas", icon: FileText },
    { id: "SELEKSI", label: "Seleksi", icon: ClipboardList },
    { id: "REVIEW", label: "Persetujuan", icon: Clock },
    { id: "DITERIMA", label: "Selesai", icon: GraduationCap },
  ];

  const currentSteps = isKIP ? stepsKIP : stepsReguler;
  
  useEffect(() => {
    const storedJalur = localStorage.getItem("jalurPilihan");
    const savedStatus = localStorage.getItem("statusPendaftaran"); 

    if (!storedJalur) {
      navigate("/daftar", { replace: true });
      return;
    }

    const validStatuses = ["DRAFT", "SUBMITTED", "SELEKSI", "REVIEW", "REVISI", "MENUNGGU_PEMBAYARAN", "VERIFIKASI_PEMBAYARAN", "DITERIMA"];
    let safeStatus = "DRAFT";
    
    if (savedStatus && validStatuses.includes(savedStatus)) {
      safeStatus = savedStatus;
    } else {
      localStorage.setItem("statusPendaftaran", "DRAFT"); 
    }

    let activeUser = user;
    if (!activeUser || !activeUser.email) {
      const storedUser = localStorage.getItem("temp-user-data");
      if (storedUser) {
        activeUser = JSON.parse(storedUser);
      }
    } else {
      localStorage.setItem("temp-user-data", JSON.stringify(user));
    }

    const isZaky = activeUser?.email === "zaky@gmail.com";
    
    setData(prev => ({
      ...prev,
      name: activeUser?.name || "Calon Mahasiswa", 
      personalEmail: activeUser?.email || "email@domain.com",
      regNumber: isZaky ? "PMB25002" : "PMB25001",
      nim: isZaky ? "2610114003" : "2610114001",
      campusEmail: isZaky ? "zaky_2610114003@stimata.ac.id" : "robby_2610114001@stimata.ac.id",
      track: `Jalur ${storedJalur} Gelombang 1`,
      status: safeStatus as RegistrationStatus
    }));

    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [navigate, user]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("jalurPilihan");
    localStorage.removeItem("statusPendaftaran");
    localStorage.removeItem("temp-user-data");
    navigate("/login");
  };

  const getStepStatus = (stepId: string) => {
    let currentStatusId = data.status;
    if (data.status === "REVISI") currentStatusId = "REVIEW";
    if (data.status === "VERIFIKASI_PEMBAYARAN") currentStatusId = "MENUNGGU_PEMBAYARAN";

    const currentStatusIdx = currentSteps.findIndex(s => s.id === currentStatusId);
    const stepIdx = currentSteps.findIndex(s => s.id === stepId);

    if (stepIdx < currentStatusIdx) return "COMPLETED";
    if (stepIdx === currentStatusIdx) return data.status === "REVISI" ? "REVISION" : "ACTIVE";
    return "PENDING";
  };

  let activeStatusId = data.status;
  if (data.status === "REVISI") activeStatusId = "REVIEW";
  if (data.status === "VERIFIKASI_PEMBAYARAN") activeStatusId = "MENUNGGU_PEMBAYARAN";

  let activeIdx = currentSteps.findIndex(s => s.id === activeStatusId);
  if (activeIdx === -1) activeIdx = 0;
  const progressWidth = `${(activeIdx / (currentSteps.length - 1)) * 100}%`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans pb-12">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-1.5 rounded-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Status Anda</h1>
          </div>
          
          {/* NAVBAR NOTIFICATION BELL */}
          <div className="flex items-center gap-2 sm:gap-4">
            <NotificationBell />
            <Button 
              onClick={handleLogout} 
              variant="ghost" 
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 font-medium px-3 h-9 transition-colors">
              <LogOut className="w-4 h-4 mr-2 hidden sm:block" /> Logout
            </Button>
          </div>
          
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => {
            localStorage.removeItem("statusPendaftaran"); 
            localStorage.removeItem("jalurPilihan"); 
            window.scrollTo(0, 0); 
            navigate("/daftar"); 
          }} 
          className="mb-2 -ml-2 sm:-ml-4 text-slate-500 hover:text-amber-600 hover:bg-amber-50">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Pemilihan Jalur
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm border-gray-200 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">Selamat datang, {data.name}</CardTitle>
                <CardDescription className="text-slate-500">
                  <span className="block mb-1 text-amber-600 font-medium">{data.personalEmail}</span>
                  Pantau status pendaftaran dan lengkapi persyaratan Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                      <Hash className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> No. Pendaftaran
                    </div>
                    <div className="font-medium text-slate-900">{data.regNumber}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center">
                      <BookOpen className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> Jalur Pilihan
                    </div>
                    <div className="font-medium text-slate-900">{data.track}</div>
                  </div>
                </div>

                {data.status === "DITERIMA" && (
                  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex flex-col gap-4">
                    <div>
                      <h4 className="text-emerald-800 font-semibold text-sm mb-0.5">NIM dan Email anda telah resmi dibuat!</h4>
                      <p className="text-emerald-600 text-xs">Gunakan data ini untuk akses Sistem Akademik (Siakad) dengan password <span className="text-emerald-800 font-semibold">Abcd1234.</span></p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 text-sm font-mono bg-white p-3 sm:py-2 px-4 rounded-md border border-emerald-100 shadow-sm w-full">
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs mb-0.5">NIM</span>
                        <span className="font-semibold text-slate-800">{data.nim}</span>
                      </div>
                      
                      <div className="hidden sm:block w-px bg-emerald-100"></div> 
                      <div className="block sm:hidden w-full h-px bg-emerald-50"></div> 
                      
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs mb-0.5">Email Kampus</span>
                        <span className="font-semibold text-slate-800 break-all">{data.campusEmail}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <CardContent className="pt-8 pb-12 px-6 sm:px-12 overflow-x-auto scrollbar-hide">
                <div className="relative flex justify-between min-w-[500px] w-full"> 
                  
                  <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-100 z-0"></div>
                  
                  <div className="absolute top-4 left-0 h-[2px] bg-amber-500 z-0 transition-all duration-700 ease-in-out"
                        style={{ width: progressWidth }}>
                  </div>

                  {currentSteps.map((step, idx) => {
                    const stepStatus = getStepStatus(step.id);
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center w-8">
                        <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm transition-all duration-300
                          ${stepStatus === 'COMPLETED' ? 'bg-amber-500 text-white' : 
                            stepStatus === 'ACTIVE' ? 'bg-amber-500 text-white ring-2 ring-amber-100' : 
                            stepStatus === 'REVISION' ? 'bg-red-500 text-white ring-2 ring-red-100' :
                            'bg-gray-100 text-gray-400'}`}>
                          {stepStatus === 'COMPLETED' ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                        </div>
                        
                        <div className="absolute top-11 left-1/2 -translate-x-1/2 w-max text-center">
                          <span className={`text-[10px] sm:text-[11px] font-bold tracking-wide uppercase whitespace-nowrap
                            ${stepStatus === 'ACTIVE' ? 'text-amber-600' : 
                              stepStatus === 'REVISION' ? 'text-red-600' : 
                              stepStatus === 'COMPLETED' ? 'text-slate-800' : 'text-slate-400'}`}>
                            {step.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm border-gray-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Status Terkini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold w-full justify-center border
                  ${data.status === 'DITERIMA' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                    data.status === 'REVISI' ? 'bg-red-50 text-red-700 border-red-200' : 
                    'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  {data.status === "VERIFIKASI_PEMBAYARAN" ? "VERIFIKASI PEMBAYARAN" : data.status.replace("_", " ")}
                </div>

                {data.status === "REVISI" && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md">
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 shrink-0" />
                      <p className="text-xs text-red-700 leading-relaxed">{data.rejectionNote}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm border-amber-200 bg-gradient-to-b from-amber-50/50 to-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Langkah Selanjutnya</h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  {data.status === "DRAFT" && "Formulir biodata Anda belum lengkap. Selesaikan untuk lanjut ke tahap pemberkasan."}
                  {data.status === "SUBMITTED" && "Segera unggah dokumen persyaratan agar bisa diverifikasi oleh admin."}
                  {data.status === "SELEKSI" && "Anda sedang dalam tahap seleksi (Verifikasi Berkas, Tes Tulis, & Wawancara). Silakan cek halaman pengumuman untuk melihat jadwal dan hasilnya."}
                  {data.status === "REVIEW" && "Data sedang diverifikasi. Cek berkala halaman ini untuk update status."}
                  {data.status === "REVISI" && "Mohon perbaiki dokumen yang ditolak agar pendaftaran dapat diproses kembali."}
                  {data.status === "MENUNGGU_PEMBAYARAN" && "Selesaikan pembayaran biaya pendaftaran untuk mengamankan kursi Anda."}
                  {data.status === "VERIFIKASI_PEMBAYARAN" && "Bukti pembayaran Anda berhasil diunggah dan sedang dicek oleh tim Keuangan."}
                  {data.status === "DITERIMA" && "Selamat bergabung! Silakan masuk komunitas Whatsapp resmi kampus STIMATA."}
                </p>
                
                {data.status === "DRAFT" && (
                  <Button 
                    onClick={() => navigate("/daftar/form")}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all">
                    Lanjut Isi Form <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
                {data.status === "SUBMITTED" && (
                  <Button onClick={() => navigate("/daftar/dokumen")}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all">
                    Upload Dokumen <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
                {data.status === "SELEKSI" && (
                  <Button 
                    onClick={() => navigate("/pengumuman")}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all">
                    Cek Pengumuman Seleksi <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
                {data.status === "REVIEW" && (
                  <Button variant="outline" className="w-full border-gray-200 text-gray-500 cursor-default">
                    Menunggu Verifikasi
                  </Button>
                )}
                {data.status === "REVISI" && (
                  <Button onClick={() => navigate("/daftar/dokumen")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all">
                    Perbaiki Dokumen <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
                
                {data.status === "MENUNGGU_PEMBAYARAN" && (
                  <Button onClick={() => navigate("/daftar/pembayaran")} className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all">
                    Bayar Sekarang <CreditCard className="w-4 h-4 ml-2" />
                  </Button>
                )}
                
                {data.status === "VERIFIKASI_PEMBAYARAN" && (
                  <Button 
                    onClick={() => navigate("/daftar/pembayaran/status")} 
                    variant="outline" 
                    className="w-full border-amber-500 text-amber-600 hover:bg-amber-50 shadow-sm transition-all">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Lihat Konfirmasi Pembayaran
                  </Button>
                )}
                
                {data.status === "DITERIMA" && (
                   <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all">
                    Join Komunitas Whatsapp <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}