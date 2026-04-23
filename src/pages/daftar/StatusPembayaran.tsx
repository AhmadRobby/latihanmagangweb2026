import React, { useState } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, Eye, RefreshCw, FileText, X, ChevronRight } from "lucide-react";

type PaymentStatus = "MENUNGGU" | "DITERIMA" | "DITOLAK";

export default function StatusPembayaran() {
  const navigate = useNavigate();
  useTitle("Halaman Status Pembayaran");
  // Ubah initial state ini untuk mengetes UI ("MENUNGGU" | "DITERIMA" | "DITOLAK")
  const [status, setStatus] = useState<PaymentStatus>("DITERIMA"); 
  const [showPreview, setShowPreview] = useState(false);

  // Data dummy (nantinya diambil dari API/State Management)
  const paymentData = {
    bankPengirim: "Bank Central Asia (BCA)",
    nominal: "Rp 2.500.000",
    tanggal: "24 Mei 2026",
    fileName: "bukti_transfer_bca_2405.jpg",
    alasanTolak: "Bukti transfer buram dan nomor referensi tidak terbaca. Mohon upload ulang foto yang lebih jelas."
  };

  const handleReupload = () => {
    navigate("/daftar/pembayaran"); 
  };

  // Fungsi baru untuk mengubah status ke progress final dan kembali ke dashboard
  const handleLanjutDashboard = () => {
    // Update local storage agar di dashboard statusnya berubah jadi DITERIMA
    localStorage.setItem("statusPendaftaran", "DITERIMA");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 relative">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")} 
          className="mb-6 text-slate-600 hover:text-amber-600 hover:bg-amber-50 px-0 sm:px-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
        </Button>

        <Card className="shadow-lg border-t-4 border-t-amber-500 overflow-hidden">
          {/* HEADER BERDASARKAN STATUS */}
          <div className={`px-6 py-8 text-center text-white
            ${status === 'MENUNGGU' ? 'bg-amber-500' : 
              status === 'DITERIMA' ? 'bg-emerald-500' : 
              'bg-red-500'}`}>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                {status === 'MENUNGGU' && <Clock className="w-8 h-8 text-white" />}
                {status === 'DITERIMA' && <CheckCircle2 className="w-8 h-8 text-white" />}
                {status === 'DITOLAK' && <AlertCircle className="w-8 h-8 text-white" />}
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {status === 'MENUNGGU' && "Menunggu Konfirmasi"}
              {status === 'DITERIMA' && "Pembayaran Dikonfirmasi"}
              {status === 'DITOLAK' && "Pembayaran Ditolak"}
            </h2>
            <p className="text-white/80 text-sm">
              {status === 'MENUNGGU' && "Tim keuangan kami sedang mengecek bukti transfer Anda."}
              {status === 'DITERIMA' && "Terima kasih, pembayaran pendaftaran Anda telah lunas."}
              {status === 'DITOLAK' && "Mohon maaf, ada masalah dengan bukti pembayaran Anda."}
            </p>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-8">
            
            {/* JIKA STATUS DITOLAK: TAMPILKAN REASON*/}
            {status === "DITOLAK" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-5 flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Alasan Penolakan:</h4>
                  <p className="text-red-700 text-sm leading-relaxed mb-4">
                    {paymentData.alasanTolak}
                  </p>
                  <Button onClick={handleReupload} className="bg-red-600 hover:bg-red-700 text-white shadow-sm">
                    <RefreshCw className="w-4 h-4 mr-2" /> Upload Ulang Bukti
                  </Button>
                </div>
              </div>
            )}

            {/* DETAIL DATA PEMBAYARAN */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Detail Pembayaran Anda</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Nominal Transfer</p>
                  <p className="font-semibold text-slate-900 text-lg">{paymentData.nominal}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Tanggal Transfer</p>
                  <p className="font-semibold text-slate-900">{paymentData.tanggal}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-slate-500 font-medium mb-1">Bank Pengirim</p>
                  <p className="font-semibold text-slate-900">{paymentData.bankPengirim}</p>
                </div>
                
                {/* PREVIEW FILE */}
                <div className="sm:col-span-2 pt-2">
                  <p className="text-sm text-slate-500 font-medium mb-2">File Bukti Transfer</p>
                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-amber-100 rounded text-amber-600 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {paymentData.fileName}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowPreview(true)}
                      className="ml-4 shrink-0 border-slate-300 text-slate-600 hover:text-amber-600 hover:border-amber-300">
                      <Eye className="w-4 h-4 mr-2" /> Lihat
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* JIKA STATUS DITERIMA: TAMPILKAN TOMBOL LANJUT */}
            {status === "DITERIMA" && (
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <Button 
                  onClick={handleLanjutDashboard} 
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm px-8">
                  Lihat NIM dan Email Kampus anda <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

          </CardContent>
        </Card>
      </div>

      {/* PREVIEW GAMBAR (just simulasi ae) */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-slate-800">Preview Bukti Transfer</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="p-1 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex justify-center bg-slate-50">
              {/* Simulasi Gambar - Bisa diganti tag <img src={url} /> kalau sudah ada URL aslinya */}
              <div className="w-full h-[300px] border-2 border-dashed border-slate-300 rounded-md flex flex-col items-center justify-center text-slate-400">
                <FileText className="w-16 h-16 mb-2 text-slate-300" />
                <p>Simulasi Gambar Bukti Transfer</p>
                <p className="text-sm font-mono mt-1">{paymentData.fileName}</p>
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50 flex justify-end">
              <Button onClick={() => setShowPreview(false)} variant="outline">Tutup</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}