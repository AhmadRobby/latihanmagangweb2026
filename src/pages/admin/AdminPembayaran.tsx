import React, { useState, useEffect } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Check, 
  X, 
  Eye, 
  CreditCard,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

// --- INTERFACES ---
interface Pembayaran {
  id: string;
  nama: string;
  nominal: number;
  tanggal: string;
  bank: string;
  buktiUrl: string; // Simulasi signed URL
}

// --- MOCK DATA (Status: MENUNGGU_KONFIRMASI) ---
const INITIAL_DATA: Pembayaran[] = [
  {
    id: "PMB25004",
    nama: "Budi Santoso",
    nominal: 2500000,
    tanggal: "2026-05-18T14:30:00",
    bank: "Bank Mandiri",
    buktiUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "PMB25003",
    nama: "Siti Aminah",
    nominal: 2500000,
    tanggal: "2026-05-19T09:15:00",
    bank: "BCA",
    buktiUrl: "https://images.unsplash.com/photo-1583521214690-73421a1829a9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "PMB25001",
    nama: "Ahmad Robby Bagus F",
    nominal: 2500000,
    tanggal: "2026-05-20T11:45:00",
    bank: "BRI",
    buktiUrl: "https://images.unsplash.com/photo-1583521214690-73421a1829a9?auto=format&fit=crop&q=80&w=800"
  }
];

export default function AdminPembayaran() {
  useTitle("Halaman Manajemen Pembayaran");
  const navigate = useNavigate();
  const [pembayaranList, setPembayaranList] = useState<Pembayaran[]>(INITIAL_DATA);
  
  // State Modal Penolakan
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [alasanTolak, setAlasanTolak] = useState("");

  // State Toast Notifikasi
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" }>({
    visible: false,
    message: "",
    type: "success"
  });

  // --- HELPER FORMATTER ---
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", { 
      dateStyle: "medium", 
      timeStyle: "short" 
    });
  };

  // --- HANDLERS ---
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
    }, 3000);
  };

  const handlePreview = (url: string) => {
    // Membuka signed URL di tab baru
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleConfirm = (id: string) => {
    // 1. Hapus item dari list
    setPembayaranList((prev) => prev.filter((p) => p.id !== id));
    // 2. Munculkan toast sukses
    showToast("Pembayaran berhasil dikonfirmasi!", "success");
  };

  const openRejectModal = (id: string) => {
    setSelectedId(id);
    setAlasanTolak("");
    setIsRejectModalOpen(true);
  };

  const handleReject = () => {
    if (!alasanTolak.trim()) {
      alert("Alasan penolakan tidak boleh kosong!");
      return;
    }
    // Hapus item dari list (di skenario nyata, update status di database)
    setPembayaranList((prev) => prev.filter((p) => p.id !== selectedId));
    // Tutup modal & reset
    setIsRejectModalOpen(false);
    setSelectedId(null);
    setAlasanTolak("");
    // Toast
    showToast("Pembayaran ditolak dan pendaftar telah dinotifikasi.", "success");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="border-slate-200 text-slate-600 hover:bg-slate-100 shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Verifikasi Pembayaran</h1>
              <p className="text-slate-500">Konfirmasi atau tolak bukti transfer pendaftar baru.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
            <CreditCard className="w-4 h-4" />
            {pembayaranList.length} Menunggu
          </div>
        </div>

        {/* MAIN CONTENT */}
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-0 overflow-x-auto">
            {pembayaranList.length === 0 ? (
              <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
                <h3 className="text-lg font-semibold text-slate-700">Semua Beres!</h3>
                <p>Tidak ada pembayaran yang menunggu konfirmasi saat ini.</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Pendaftar</th>
                    <th className="px-6 py-4 font-semibold">Detail Transfer</th>
                    <th className="px-6 py-4 font-semibold text-center">Bukti</th>
                    <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pembayaranList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{item.nama}</p>
                        <p className="text-xs text-slate-500">ID: {item.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">{formatRupiah(item.nominal)}</p>
                        <div className="text-xs text-slate-500 space-y-0.5 mt-1">
                          <p>{item.bank}</p>
                          <p>{formatDate(item.tanggal)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button 
                          onClick={() => handlePreview(item.buktiUrl)}
                          variant="outline" 
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50">
                          <Eye className="w-4 h-4 mr-1.5" /> Lihat Bukti
                        </Button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            onClick={() => openRejectModal(item.id)}
                            variant="outline" 
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                            <X className="w-4 h-4 mr-1" /> Tolak
                          </Button>
                          <Button 
                            onClick={() => handleConfirm(item.id)}
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Check className="w-4 h-4 mr-1" /> Konfirmasi
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* MODAL PENOLAKAN */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-xl border-red-100">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-500" /> Tolak Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Alasan Penolakan <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={4}
                  placeholder="Contoh: Bukti transfer buram, nominal tidak sesuai, atau transfer tidak masuk ke mutasi."
                  value={alasanTolak}
                  onChange={(e) => setAlasanTolak(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none resize-none text-sm"
                />
                <p className="text-xs text-slate-500">
                  Alasan ini akan dikirimkan ke email pendaftar agar mereka bisa melakukan upload ulang.
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>Batal</Button>
                <Button onClick={handleReject} className="bg-red-600 hover:bg-red-700 text-white">Konfirmasi Penolakan</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TOAST NOTIFIKASI */}
      {toast.visible && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 ${
          toast.type === "success" ? "bg-white border-emerald-200 text-emerald-800" : "bg-white border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <p className="font-medium text-sm">{toast.message}</p>
        </div>
      )}

    </div>
  );
}