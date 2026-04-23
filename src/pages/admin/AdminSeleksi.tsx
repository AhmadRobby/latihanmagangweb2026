import React, { useState } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  Edit3, 
  CheckCircle, 
  Megaphone,
  AlertCircle,
  FileSignature,
  ArrowLeft 
} from "lucide-react";

interface Peserta {
  id: string;
  nama: string;
  jalur: string;
  statusDokumen: string;
  jadwal: { tanggal: string; lokasi: string } | null;
  nilai: { ujian: number | null; wawancara: number | null };
  statusSeleksi: string;
}

// --- MOCK DATA ---
const INITIAL_DATA = [
  {
    id: "PMB25004",
    nama: "Budi Santoso",
    jalur: "KIP Kuliah",
    statusDokumen: "Terverifikasi",
    jadwal: null,
    nilai: { ujian: null, wawancara: null },
    statusSeleksi: "Menunggu Jadwal",
  },
  {
    id: "PMB25003",
    nama: "Siti Aminah",
    jalur: "KIP Kuliah",
    statusDokumen: "Terverifikasi",
    jadwal: { tanggal: "2026-04-20T08:00", lokasi: "Gedung A, Ruang 101" },
    nilai: { ujian: null, wawancara: null },
    statusSeleksi: "Menunggu Nilai",
  },
  {
    id: "PMB25005",
    nama: "Clara Shinta",
    jalur: "KIP Kuliah",
    statusDokumen: "Terverifikasi",
    jadwal: { tanggal: "2026-04-20T10:00", lokasi: "Gedung A, Ruang 102" },
    nilai: { ujian: 85, wawancara: 90 },
    statusSeleksi: "Selesai Penilaian",
  }
];

export default function AdminSeleksi() {
  const navigate = useNavigate(); // <-- Inisialisasi navigasi
  const [peserta, setPeserta] = useState<Peserta[]>(INITIAL_DATA);
  useTitle("Halaman Manajemen Seleksi");
  // State Modal Jadwal
  const [isJadwalModalOpen, setIsJadwalModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [jadwalForm, setJadwalForm] = useState({ tanggal: "", lokasi: "" });

  // State Modal Nilai
  const [isNilaiModalOpen, setIsNilaiModalOpen] = useState(false);
  const [nilaiForm, setNilaiForm] = useState({ ujian: "", wawancara: "" });

  // State Modal Publish
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // --- HANDLER JADWAL ---
  const openJadwalModal = (id: string, existingJadwal: any) => {
    setSelectedId(id);
    setJadwalForm(existingJadwal || { tanggal: "", lokasi: "" });
    setIsJadwalModalOpen(true);
  };

  const saveJadwal = () => {
    setPeserta(peserta.map(p => 
      p.id === selectedId 
        ? { ...p, jadwal: jadwalForm, statusSeleksi: p.nilai.ujian ? "Selesai Penilaian" : "Menunggu Nilai" } 
        : p
    ));
    setIsJadwalModalOpen(false);
  };

  // --- HANDLER NILAI ---
  const openNilaiModal = (id: string, existingNilai: any) => {
    setSelectedId(id);
    setNilaiForm({ 
      ujian: existingNilai?.ujian || "", 
      wawancara: existingNilai?.wawancara || "" 
    });
    setIsNilaiModalOpen(true);
  };

  const saveNilai = () => {
    setPeserta(peserta.map(p => 
      p.id === selectedId 
        ? { ...p, nilai: { ujian: Number(nilaiForm.ujian), wawancara: Number(nilaiForm.wawancara) }, statusSeleksi: "Selesai Penilaian" } 
        : p
    ));
    setIsNilaiModalOpen(false);
  };

  // --- HANDLER PUBLISH ---
  const handlePublish = () => {
    alert("Pengumuman berhasil dipublish! Pendaftar sekarang dapat melihat hasil KIP mereka.");
    setIsPublishModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="border-slate-200 text-slate-600 hover:bg-slate-100 shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Manajemen Seleksi KIP</h1>
              <p className="text-slate-500">Kelola jadwal ujian, wawancara, dan penilaian peserta KIP Kuliah.</p>
            </div>
          </div>
          
          {/* <-- TOMBOL PUBLISH --> */}
          <Button 
            onClick={() => setIsPublishModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white shadow-md">
            <Megaphone className="w-4 h-4 mr-2" /> Publish Pengumuman
          </Button>
        </div>

        {/* TABEL PESERTA */}
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID / Nama</th>
                  <th className="px-6 py-4 font-semibold">Jadwal Ujian & Wawancara</th>
                  <th className="px-6 py-4 font-semibold">Nilai Ujian</th>
                  <th className="px-6 py-4 font-semibold">Nilai Wawancara</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {peserta.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{p.id}</p>
                      <p className="text-slate-500">{p.nama}</p>
                    </td>
                    <td className="px-6 py-4">
                      {p.jadwal ? (
                        <div className="space-y-1">
                          <div className="flex items-center text-amber-700 font-medium">
                            <Calendar className="w-4 h-4 mr-1.5" /> 
                            {new Date(p.jadwal.tanggal).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                          <div className="flex items-center text-slate-500 text-xs">
                            <MapPin className="w-3.5 h-3.5 mr-1.5" /> {p.jadwal.lokasi}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-xs">Belum diatur</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {p.nilai.ujian !== null ? p.nilai.ujian : "-"}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {p.nilai.wawancara !== null ? p.nilai.wawancara : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        p.statusSeleksi === "Selesai Penilaian" ? "bg-emerald-100 text-emerald-700" :
                        p.statusSeleksi === "Menunggu Nilai" ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {p.statusSeleksi}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center gap-2">
                      <Button 
                        onClick={() => openJadwalModal(p.id, p.jadwal)}
                        variant="outline" 
                        size="sm" 
                        className="text-amber-600 border-amber-200 hover:bg-amber-50">
                        <Calendar className="w-4 h-4 mr-1" /> Set Jadwal
                      </Button>
                      <Button 
                        onClick={() => openNilaiModal(p.id, p.nilai)}
                        disabled={!p.jadwal} // Hanya bisa input nilai jika jadwal sudah ada
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 disabled:opacity-50">
                        <FileSignature className="w-4 h-4 mr-1" /> Input Nilai
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* MODAL SET JADWAL */}
      {isJadwalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-amber-500" /> Atur Jadwal Seleksi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal & Waktu</label>
                <input 
                  type="datetime-local" 
                  value={jadwalForm.tanggal}
                  onChange={(e) => setJadwalForm({...jadwalForm, tanggal: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi / Link Zoom</label>
                <input 
                  type="text" 
                  placeholder="Gedung A, Ruang 101..."
                  value={jadwalForm.lokasi}
                  onChange={(e) => setJadwalForm({...jadwalForm, lokasi: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsJadwalModalOpen(false)}>Batal</Button>
                <Button onClick={saveJadwal} className="bg-amber-600 hover:bg-amber-700 text-white">Simpan Jadwal</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* MODAL INPUT NILAI */}
      {isNilaiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <Card className="w-full max-w-sm shadow-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800 flex items-center">
                <Edit3 className="w-5 h-5 mr-2 text-indigo-500" /> Input Penilaian
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nilai Ujian Tulis (0-100)</label>
                <input 
                  type="number" 
                  min="0" max="100"
                  value={nilaiForm.ujian}
                  onChange={(e) => setNilaiForm({...nilaiForm, ujian: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nilai Wawancara (0-100)</label>
                <input 
                  type="number" 
                  min="0" max="100"
                  value={nilaiForm.wawancara}
                  onChange={(e) => setNilaiForm({...nilaiForm, wawancara: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsNilaiModalOpen(false)}>Batal</Button>
                <Button onClick={saveNilai} className="bg-indigo-600 hover:bg-indigo-700 text-white">Simpan Nilai</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* MODAL KONFIRMASI PUBLISH */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-amber-600" /> Konfirmasi Pengumuman
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-slate-600">
                Apakah Anda yakin ingin mem-publish pengumuman hasil seleksi KIP ini? Setelah di-publish, pendaftar dapat melihat status kelulusan mereka di dasbor masing-masing.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsPublishModalOpen(false)}>Batal</Button>
                <Button onClick={handlePublish} className="bg-amber-600 hover:bg-amber-700 text-white">Ya, Publish Sekarang</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}