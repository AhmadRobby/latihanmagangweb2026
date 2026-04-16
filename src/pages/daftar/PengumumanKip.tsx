import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  MapPin, 
  MessageCircle, 
  FileUp, 
  ArrowRight,
  GraduationCap,
  Info,
  Download
} from "lucide-react";

// Tipe status pengumuman
type StatusPengumuman = "MENUNGGU" | "LOLOS" | "TIDAK_LOLOS";

export default function PengumumanKip() {
  const navigate = useNavigate();
  
  // STATE SIMULASI: Ubah default state di sini atau gunakan tombol simulator di UI
  const [status, setStatus] = useState<StatusPengumuman>("MENUNGGU");
  
  // STATE & REF UNTUK UPLOAD FILE
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Di sini kamu bisa tambahkan logika upload ke server/API nantinya
    }
  };

  // Mock Data Jadwal Ujian & Wawancara
  const jadwalSeleksi = [
    {
      kegiatan: "Ujian Tulis Berbasis Komputer (UTBK)",
      tanggal: "Senin, 25 Mei 2026",
      waktu: "08:00 - 11:30 WIB",
      lokasi: "Lab Komputer STIMATA",
      jenis: "Offline"
    },
    {
      kegiatan: "Wawancara Calon Penerima KIP Kuliah",
      tanggal: "Rabu, 27 Mei 2026",
      waktu: "13:00 - Selesai",
      lokasi: "Zoom Meeting (Link akan dikirim via Email)",
      jenis: "Online"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate("/dashboard")} 
              variant="ghost" 
              size="icon"
              className="text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Pengumuman Seleksi</h1>
          </div>
          <GraduationCap className="w-6 h-6 text-amber-500" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* DEV TOOLS SIMULATOR */}
        <div className="bg-slate-800 p-3 rounded-lg flex items-center justify-between shadow-md mb-8">
          <span className="text-slate-300 text-sm font-medium flex items-center">
            <Info className="w-4 h-4 mr-2" /> Simulator Status (Dev Only):
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant={status === "MENUNGGU" ? "default" : "secondary"} onClick={() => setStatus("MENUNGGU")} className={status === "MENUNGGU" ? "bg-amber-500 hover:bg-amber-600" : ""}>Menunggu</Button>
            <Button size="sm" variant={status === "LOLOS" ? "default" : "secondary"} onClick={() => setStatus("LOLOS")} className={status === "LOLOS" ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}>Lolos</Button>
            <Button size="sm" variant={status === "TIDAK_LOLOS" ? "default" : "secondary"} onClick={() => setStatus("TIDAK_LOLOS")} className={status === "TIDAK_LOLOS" ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}>Tidak Lolos</Button>
          </div>
        </div>

        {/* --- KONDISI 1: MENUNGGU PENGUMUMAN --- */}
        {status === "MENUNGGU" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-amber-200 bg-amber-50 shadow-sm">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Menunggu Pengumuman</h2>
                <p className="text-slate-600 max-w-md">
                  Pengumuman hasil seleksi KIP Kuliah belum tersedia. Silakan cek kembali secara berkala atau perhatikan jadwal seleksi di bawah ini.
                </p>
              </CardContent>
            </Card>

            <h3 className="text-lg font-bold text-slate-800 px-1 mt-8">Jadwal Seleksi Anda</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jadwalSeleksi.map((jadwal, i) => (
                <Card key={i} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow border-l-4 border-l-amber-500">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800">{jadwal.kegiatan}</h4>
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {jadwal.jenis}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" /> {jadwal.tanggal}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" /> {jadwal.waktu}
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> 
                        <span>{jadwal.lokasi}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* --- KONDISI 2: LOLOS SELEKSI --- */}
        {status === "LOLOS" && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <Card className="border-emerald-200 bg-emerald-50 shadow-sm overflow-hidden relative">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-200 rounded-full opacity-50 blur-2xl"></div>
              
              <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-emerald-800 mb-2">SELAMAT!</h2>
                <p className="text-lg font-medium text-emerald-700 mb-4">Anda dinyatakan LOLOS seleksi jalur KIP Kuliah.</p>
                <p className="text-slate-600 max-w-lg">
                  Langkah Anda menuju masa depan yang cerah dimulai dari sini. Silakan ikuti instruksi di bawah ini untuk mengamankan kursi Anda.
                </p>
              </CardContent>
            </Card>

            <h3 className="text-lg font-bold text-slate-800 px-1 mt-8">Langkah Selanjutnya</h3>
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 mt-1">1</div>
                      <div>
                        <h4 className="font-bold text-slate-800">Registrasi Ulang Mahasiswa Baru</h4>
                        <p className="text-sm text-slate-500 mt-1">Lengkapi data diri tambahan dan cetak KTM (Kartu Tanda Mahasiswa) sementara.</p>
                      </div>
                    </div>
                    <Button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white shrink-0">
                      Mulai Registrasi <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  
                  {/* UPDATE BAGIAN SINI: Unduh & Upload */}
                  <div className="p-6 flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 mt-1">2</div>
                      <div>
                        <h4 className="font-bold text-slate-800">Unduh & Upload Surat Pernyataan</h4>
                        <p className="text-sm text-slate-500 mt-1">
                          Unduh format surat pernyataan kesediaan, cetak dan tandatangani (bermaterai). Setelah itu, unggah kembali hasil scan/foto dokumen tersebut.
                        </p>
                        {selectedFile && (
                          <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> {selectedFile.name} siap diunggah.
                          </p>
                        )}
                      </div>
                    </div>                    
                    
                    {/* Input file tersembunyi */}
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    
                    {/* Tombol Download dan Upload */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                      <Button 
                        variant="outline" 
                        onClick={() => alert("Mengunduh format_surat_pernyataan.pdf...")}
                        className="w-full sm:w-auto text-amber-600 border-amber-300 hover:bg-amber-50">
                        <Download className="w-4 h-4 mr-2" /> Download Format
                      </Button>
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white">
                        <FileUp className="w-4 h-4 mr-2" /> 
                        {selectedFile ? "Ganti File" : "Upload Scan"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* --- KONDISI 3: TIDAK LOLOS --- */}
        {status === "TIDAK_LOLOS" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <Card className="border-red-200 bg-red-50 shadow-sm">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Mohon Maaf</h2>
                <p className="text-slate-700 max-w-md">
                  Berdasarkan hasil seleksi dan kuota yang tersedia, Anda <strong>belum lolos</strong> penerimaan mahasiswa baru melalui jalur KIP Kuliah.
                </p>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Card className="border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-800 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" /> Jangan Patah Semangat!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700">
                    Kami melihat potensi besar dalam diri Anda. Sebagai alternatif, kami mengundang Anda untuk bergabung melalui jalur <strong>Beasiswa Prestasi Internal Kampus</strong> dengan potongan UKT hingga 50%.
                  </p>
                  
                  <div className="bg-white/60 p-4 rounded-lg border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-800">Tertarik mencoba jalur Beasiswa Prestasi?</h4>
                      <p className="text-sm text-slate-600">Konsultasikan peluang Anda dengan tim Admisi kami sekarang.</p>
                    </div>
                    <Button 
                      onClick={() => window.open("https://wa.me/6285708290968", "_blank")}
                      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white shadow-sm">
                      <MessageCircle className="w-4 h-4 mr-2" /> Hubungi via WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}