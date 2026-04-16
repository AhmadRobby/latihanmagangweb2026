import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  User, 
  GraduationCap, 
  Users, 
  FileText, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  AlertTriangle,
  Award,
  BookOpen
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_APPLICANT = {
  id: "PMB25001",
  nama: "Ahmad Robby Bagus F",
    // UBAH JALUR DI BAWAH INI MENJADI "KIP Kuliah" UNTUK MELIHAT TAMPILAN KIP
  jalur: "Reguler", 
  status: "MENUNGGU_VERIFIKASI", // Ubah jadi "LOLOS_KIP" untuk tes tombol Generate NIM
  tanggalDaftar: "18 Mei 2024",
  dataPribadi: {
    nik: "3507123456780001",
    ttl: "Malang, 12 Agustus 2005",
    gender: "Laki-laki",
    agama: "Islam",
    noHp: "081234567890",
    email: "ahmad.robby@email.com",
    alamat: "Jl. Soekarno Hatta No. 9, Kota Malang, Jawa Timur",
  },
  dataPendidikan: {
    asalSekolah: "MAN 2 Kota Malang",
    jurusan: "Sastra dan Bahasa",
    tahunLulus: "2023",
    nilaiRataRata: "98.5",
  },
  dataOrtu: {
    namaAyah: "Chico Lachaowski",
    pekerjaanAyah: "Game Developer",
    namaIbu: "Ada Wong",
    pekerjaanIbu: "Ibu Rumah Tangga",
    penghasilan: "Rp 30.000.000 - Rp 150.000.000",
  },
  dokumen: [
    { nama: "Kartu Keluarga", fileUrl: "#", status: "Valid" },
    { nama: "Ijazah / SKL", fileUrl: "#", status: "Valid" },
    { nama: "Transkrip Nilai Rapor", fileUrl: "#", status: "Menunggu" },
  ],
  pembayaran: {
    status: "Lunas",
    jumlah: "Rp 2.500.000",
    tanggal: "19 Mei 2025",
    metode: "Transfer Bank BCA",
    fileUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800", // Diperbarui dengan link Unsplash
  },
  dataKip: {
    nomorKip: "KIP-2025-987654321",
    statusKip: "Menunggu Verifikasi",
    fileUrl: "#"
  },
  timeline: [
    { status: "Mendaftar Akun", tanggal: "18 Mei 2025 08:00", desc: "Pendaftar membuat akun PMB." },
    { status: "Melengkapi Biodata", tanggal: "18 Mei 2025 09:30", desc: "Pendaftar menyelesaikan pengisian form." },
    { status: "Upload Dokumen", tanggal: "18 Mei 2025 10:15", desc: "Pendaftar mengunggah berkas persyaratan." },
  ]
};

export default function AdminDetailPendaftar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk Modal Tolak Dokumen
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    // Simulasi Fetch API berdasarkan ID
    setTimeout(() => {
      setApplicant(MOCK_APPLICANT);
      setIsLoading(false);
    }, 600);
  }, [id]);

  if (isLoading || !applicant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // Logika memunculkan tombol Generate NIM
  const canGenerateNIM = 
    (applicant.jalur === "Reguler" && applicant.status === "PEMBAYARAN_DIKONFIRMASI") ||
    (applicant.jalur === "KIP Kuliah" && applicant.status === "LOLOS_KIP");

  const getStatusBadge = (status: string) => {
    if (status.includes("LOLOS") || status.includes("DIKONFIRMASI") || status === "Valid" || status === "Lunas") {
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    }
    if (status.includes("TOLAK") || status === "Tidak Valid") {
      return "bg-red-100 text-red-700 border-red-200";
    }
    return "bg-amber-100 text-amber-700 border-amber-200";
  };

  const handleVerifikasiDokumen = () => {
    alert("Semua dokumen telah diverifikasi!");
    // Panggil API PATCH /admin/pendaftar/:id/verifikasi
  };

  const handleTolakSubmit = () => {
    alert(`Dokumen ditolak dengan alasan: ${rejectReason}`);
    setIsRejectModalOpen(false);
    setRejectReason("");
    // Panggil API PATCH /admin/pendaftar/:id/tolak
  };

  // Handler untuk Preview Bukti Transfer
  const handlePreviewBukti = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("Bukti transfer tidak tersedia.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 relative">
      
      {/* HEADER PAGE */}
      <header className="bg-amber-600 border-b border-amber-700 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Button 
            onClick={() => navigate("/admin/pendaftar")} 
            variant="ghost" 
            size="icon"
            className="text-amber-50 hover:text-white hover:bg-amber-700 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-white tracking-tight">Detail Pendaftar</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* TOP BANNER INFO */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-800">{applicant.nama}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(applicant.status)}`}>
                {applicant.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-slate-500 font-medium">
              No. Pendaftaran: <span className="text-slate-800">{applicant.id}</span> • Jalur: <span className="text-amber-600 font-bold">{applicant.jalur}</span>
            </p>
          </div>
          
          {/* TOMBOL GENERATE NIM (CONDITIONAL) */}
          {canGenerateNIM && (
            <Button 
              onClick={() => alert("NIM Berhasil di-generate!")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md animate-pulse hover:animate-none">
              <Award className="w-4 h-4 mr-2" /> Generate NIM Mahasiswa
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* KOLOM KIRI (DATA UTAMA) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* DATA PRIBADI */}
            <Card className="shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-amber-500" /> Data Pribadi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div><p className="text-sm text-slate-500">NIK</p><p className="font-medium">{applicant.dataPribadi.nik}</p></div>
                  <div><p className="text-sm text-slate-500">Tempat, Tanggal Lahir</p><p className="font-medium">{applicant.dataPribadi.ttl}</p></div>
                  <div><p className="text-sm text-slate-500">Jenis Kelamin</p><p className="font-medium">{applicant.dataPribadi.gender}</p></div>
                  <div><p className="text-sm text-slate-500">Agama</p><p className="font-medium">{applicant.dataPribadi.agama}</p></div>
                  <div><p className="text-sm text-slate-500">No. HP / WhatsApp</p><p className="font-medium">{applicant.dataPribadi.noHp}</p></div>
                  <div><p className="text-sm text-slate-500">Email</p><p className="font-medium">{applicant.dataPribadi.email}</p></div>
                  <div className="md:col-span-2"><p className="text-sm text-slate-500">Alamat Lengkap</p><p className="font-medium">{applicant.dataPribadi.alamat}</p></div>
                </div>
              </CardContent>
            </Card>

            {/* DATA PENDIDIKAN & ORTU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-amber-500" /> Pendidikan
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div><p className="text-sm text-slate-500">As Sekolah</p><p className="font-medium">{applicant.dataPendidikan.asalSekolah}</p></div>
                  <div><p className="text-sm text-slate-500">Jurusan</p><p className="font-medium">{applicant.dataPendidikan.jurusan}</p></div>
                  <div><p className="text-sm text-slate-500">Tahun Lulus</p><p className="font-medium">{applicant.dataPendidikan.tahunLulus}</p></div>
                  <div><p className="text-sm text-slate-500">Nilai Rata-rata Rapor</p><p className="font-medium">{applicant.dataPendidikan.nilaiRataRata}</p></div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-amber-500" /> Orang Tua/Wali
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div><p className="text-sm text-slate-500">Nama Ayah</p><p className="font-medium">{applicant.dataOrtu.namaAyah} ({applicant.dataOrtu.pekerjaanAyah})</p></div>
                  <div><p className="text-sm text-slate-500">Nama Ibu</p><p className="font-medium">{applicant.dataOrtu.namaIbu} ({applicant.dataOrtu.pekerjaanIbu})</p></div>
                  <div><p className="text-sm text-slate-500">Rata-rata Penghasilan</p><p className="font-medium">{applicant.dataOrtu.penghasilan}</p></div>
                </CardContent>
              </Card>
            </div>

            {/* CONDITIONAL RENDERING: INFO PEMBAYARAN VS INFO KIP */}
            {applicant.jalur === "Reguler" ? (
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-amber-500" /> Info Pembayaran
                  </CardTitle>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(applicant.pembayaran.status)}`}>
                    {applicant.pembayaran.status}
                  </span>
                </CardHeader>
                <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-8">
                    <div><p className="text-sm text-slate-500">Nominal</p><p className="font-bold text-lg text-slate-800">{applicant.pembayaran.jumlah}</p></div>
                    <div><p className="text-sm text-slate-500">Metode</p><p className="font-medium">{applicant.pembayaran.metode}</p></div>
                    <div><p className="text-sm text-slate-500">Tanggal Bayar</p><p className="font-medium">{applicant.pembayaran.tanggal}</p></div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-amber-600 border-amber-200 hover:bg-amber-50"
                    onClick={() => handlePreviewBukti(applicant.pembayaran.fileUrl)}
                  >
                    <Eye className="w-4 h-4 mr-2" /> Lihat Bukti Transfer
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm border-slate-200 border-l-4 border-l-indigo-500">
                <CardHeader className="bg-indigo-50/50 border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-indigo-900 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-indigo-500" /> Data KIP Kuliah
                  </CardTitle>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(applicant.dataKip.statusKip)}`}>
                    {applicant.dataKip.statusKip}
                  </span>
                </CardHeader>
                <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-sm text-slate-500">Nomor Registrasi KIP / KKS</p>
                      <p className="font-bold text-lg text-slate-800">{applicant.dataKip.nomorKip}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    {applicant.status !== "LOLOS_KIP" && (
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" /> Verifikasi KIP
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* KOLOM KANAN (DOKUMEN & TIMELINE) */}
          <div className="space-y-6">
            
            {/* DOKUMEN & VERIFIKASI */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-amber-500" /> Dokumen Pendaftar
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {applicant.dokumen.map((doc: any, i: number) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{doc.nama}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusBadge(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-500 hover:text-amber-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {/* AKSI DOKUMEN */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
                  <p className="text-xs text-slate-500 mb-1 text-center">Tindakan Admin:</p>
                  <Button 
                    onClick={handleVerifikasiDokumen}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" /> Verifikasi Seluruh Dokumen
                  </Button>
                  <Button 
                    onClick={() => setIsRejectModalOpen(true)}
                    variant="outline" 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50">
                    <XCircle className="w-4 h-4 mr-2" /> Tolak Dokumen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* TIMELINE RIWAYAT */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-amber-500" /> Riwayat Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
                  {applicant.timeline.map((event: any, index: number) => (
                    <div key={index} className="relative pl-6">
                      {/* Titik Timeline */}
                      <span className={`absolute -left-[9px] top-1 rounded-full w-4 h-4 border-2 border-white ${index === applicant.timeline.length - 1 ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
                      
                      <p className="font-semibold text-slate-800 text-sm">{event.status}</p>
                      <p className="text-xs text-amber-600 font-medium mb-1">{event.tanggal}</p>
                      <p className="text-xs text-slate-500">{event.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>

      {/* MODAL TOLAK DOKUMEN */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg text-slate-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> Tolak Dokumen
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-slate-600">
                Silakan tuliskan catatan atau alasan mengapa dokumen pendaftar ditolak. Catatan ini akan dilihat oleh pendaftar.
              </p>
              <textarea
                className="w-full h-32 p-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                placeholder="Contoh: KTP blur, Ijazah tidak dilegalisir..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              ></textarea>
              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsRejectModalOpen(false);
                    setRejectReason("");
                  }}>
                  Batal
                </Button>
                <Button 
                  onClick={handleTolakSubmit}
                  disabled={!rejectReason.trim()}
                  className="bg-red-600 hover:bg-red-700 text-white">
                  Kirim Penolakan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}