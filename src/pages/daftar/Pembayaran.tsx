import React, { useState } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, CheckCircle2, AlertCircle, CreditCard, ArrowLeft, Loader2, Copy } from "lucide-react";

export default function Pembayaran() {
  useTitle("Halaman Pembayaran");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    bankPengirim: "",
    nominal: "",
    tanggal: "",
    file: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Berhasil menyalin: ${text}`); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi proses upload ke server
    setTimeout(() => {
      // 🟢 PASTIKAN BARIS INI ADA: Mengubah status di localStorage agar saat ke dashboard tidak reset
      localStorage.setItem("statusPendaftaran", "VERIFIKASI_PEMBAYARAN");
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <Card className="max-w-md w-full text-center border-t-4 border-t-amber-500 shadow-xl">
          <CardContent className="pt-10 pb-8 flex flex-col items-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Upload Berhasil!</h2>
            <p className="text-slate-600 mb-8">
              Bukti pembayaran Anda telah kami terima dan saat ini berstatus:
              <br />
              <span className="inline-block mt-3 px-4 py-1.5 bg-amber-50 text-amber-700 font-semibold rounded-full border border-amber-200">
                ⏳ Menunggu Konfirmasi Admin
              </span>
            </p>
            <Button onClick={() => navigate("/dashboard")} className="bg-amber-500 hover:bg-amber-600 w-full text-white">
              Kembali ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")} 
          className="mb-6 text-slate-600 hover:text-amber-600 hover:bg-amber-50 px-0 sm:px-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Pembayaran Pendaftaran</h1>
          <p className="text-slate-600 mt-2">Selesaikan pembayaran untuk melanjutkan proses pendaftaran mahasiswa baru.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* SISI KIRI: INFO REKENING & INSTRUKSI */}
          <div className="space-y-6">
            <Card className="border-l-4 border-l-amber-500 shadow-md">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5 text-amber-500" /> 
                  Informasi Rekening Tujuan
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Bank Tujuan</p>
                  <p className="text-lg font-bold text-slate-800">Bank Mandiri</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Nomor Rekening</p>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-mono font-bold text-amber-600 tracking-wider">144-00-1234567-8</p>
                    <button onClick={() => copyToClipboard("1440012345678")} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors">
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Atas Nama</p>
                  <p className="text-lg font-bold text-slate-800">Admin Kampus STIMATA</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500 font-medium">Nominal Pembayaran</p>
                  <p className="text-2xl font-bold text-slate-900">Rp 2.500.000</p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 text-blue-800">
              <AlertCircle className="w-6 h-6 shrink-0 text-blue-600" />
              <div>
                <h4 className="font-bold text-blue-900 mb-1">Instruksi Penting</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Pastikan nominal transfer sesuai (Rp 2.500.000).</li>
                  <li><strong>Wajib</strong> mencantumkan <strong>Nomor Pendaftaran</strong> pada kolom keterangan/berita transfer.</li>
                  <li>Simpan struk/bukti transfer yang sah untuk diunggah.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SISI KANAN: FORM UPLOAD */}
          <Card className="shadow-md h-fit">
            <CardHeader>
              <CardTitle>Konfirmasi Pembayaran</CardTitle>
              <CardDescription>Isi data di bawah ini dan unggah bukti transfer Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Bank Pengirim</label>
                  <input required type="text" name="bankPengirim" value={formData.bankPengirim} onChange={handleChange} placeholder="Contoh: BCA, BRI, Dana, dll" className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Nominal yang Ditransfer (Rp)</label>
                  <input required type="number" name="nominal" value={formData.nominal} onChange={handleChange} placeholder="Contoh: 2.500.000" className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Tanggal Transfer</label>
                  <input required type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} className="flex w-full sm:w-[200px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-sm font-semibold text-slate-700">Upload Bukti Transfer</label>
                  <div className="mt-1 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-8 hover:bg-slate-50 transition-colors">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-amber-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-600 focus-within:ring-offset-2 hover:text-amber-500">
                          <span>Pilih file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/jpeg, image/png, application/pdf" required onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">atau drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-slate-500 mt-1">PNG, JPG, PDF up to 5MB</p>
                      {formData.file && (
                        <p className="text-sm text-amber-600 font-medium mt-3 bg-amber-50 inline-block px-3 py-1 rounded-md">
                          File terpilih: {formData.file.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.file} 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white mt-6 h-11">
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sedang Mengupload...</>
                  ) : (
                    "Kirim Bukti Pembayaran"
                  )}
                </Button>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}