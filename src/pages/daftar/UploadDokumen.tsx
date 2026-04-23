import React, { useState, useEffect } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Image as ImageIcon,
  Eye, 
  RefreshCw, 
  UploadCloud,
  ChevronRight,
  X
} from "lucide-react";

type DocStatus = "BELUM" | "TERUPLOAD" | "DITOLAK";

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  acceptedFormats: string;
  maxSizeMB: number;
  status: DocStatus;
  fileName?: string;
  rejectionNote?: string;
  icon: React.ElementType;
}

export default function UploadDokumen() {
  useTitle("Halaman Upload Dokumen");
  const navigate = useNavigate();
  const [jalur, setJalur] = useState("Reguler");
  const [errorMsg, setErrorMsg] = useState("");

  // for Sertifikat Opsional
  const [certificates, setCertificates] = useState<{ name: string }[]>([]);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "ijazah",
      name: "Scan Ijazah Asli / SKL",
      description: "Format .pdf atau .jpg, max 2MB",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
      maxSizeMB: 2,
      status: "BELUM",
      icon: FileText,
    },
    {
      id: "kk",
      name: "Kartu Keluarga (KK)",
      description: "Format .pdf atau .jpg, max 2MB",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
      maxSizeMB: 2,
      status: "BELUM",
      icon: FileText,
    },
    {
      id: "foto",
      name: "Pas Foto Berwarna 4x6",
      description: "Latar belakang merah. Format .jpg, max 2MB",
      acceptedFormats: ".jpg,.jpeg,.png",
      maxSizeMB: 2,
      status: "BELUM",
      icon: ImageIcon,
    }
  ]);

  useEffect(() => {
    const savedJalur = localStorage.getItem("jalurPilihan");
    if (savedJalur) {
      setJalur(savedJalur);
      
      if (savedJalur === "KIP") {
        setDocuments(prev => {
          if (prev.some(d => d.id === "kip")) return prev;
          
          return [...prev, {
            id: "kip",
            name: "Kartu KIP / KKS / SKTM",
            description: "Format .pdf atau .jpg, max 2MB",
            acceptedFormats: ".pdf,.jpg,.jpeg,.png",
            maxSizeMB: 2,
            status: "BELUM",
            icon: FileText,
          }];
        });
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const file = e.target.files?.[0];
    setErrorMsg("");

    if (!file) return;

    const docConfig = documents.find(d => d.id === docId);
    if (!docConfig) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > docConfig.maxSizeMB) {
      setErrorMsg(`Ukuran file ${file.name} terlalu besar. Maksimal ${docConfig.maxSizeMB}MB.`);
      e.target.value = ""; 
      return;
    }

    const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const acceptedExts = docConfig.acceptedFormats.split(',');
    if (!acceptedExts.includes(fileExt)) {
      setErrorMsg(`Format file ${file.name} tidak didukung. Gunakan format: ${docConfig.acceptedFormats}`);
      e.target.value = ""; 
      return;
    }

    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: "TERUPLOAD",
          fileName: file.name,
          rejectionNote: undefined 
        };
      }
      return doc;
    }));
  };

  // Handler untuk Multiple Upload Sertifikat (Opsional)
  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    // Cek batas maksimal (sebelumnya + yang baru dipilih)
    if (certificates.length + files.length > 3) {
      setErrorMsg("Maksimal hanya bisa upload 3 gambar sertifikat.");
      e.target.value = "";
      return;
    }

    const validFiles: { name: string }[] = [];
    let hasError = false;

    files.forEach(file => {
      const fileSizeMB = file.size / (1024 * 1024);
      const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
      
      if (fileSizeMB > 2 || !['.jpg', '.jpeg', '.png'].includes(fileExt)) {
        hasError = true;
      } else {
        validFiles.push({ name: file.name });
      }
    });

    if (hasError) {
      setErrorMsg("Beberapa file ditolak karena ukuran lebih dari 2MB atau format tidak sesuai (.jpg/.png).");
    }

    setCertificates(prev => [...prev, ...validFiles]);
    e.target.value = ""; // Reset input
  };

  // Handler for menghapus sertifikat yang udah dipilih
  const removeCertificate = (indexToRemove: number) => {
    setCertificates(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handlePreview = (fileName?: string) => {
    if (fileName) {
      alert(`Membuka preview untuk: ${fileName}`);
    }
  };

  const isAllUploaded = documents.every(d => d.status === "TERUPLOAD");

  const handleSubmit = () => {
    alert("Berkas telah berhasil dikirim! Silakan tunggu proses verifikasi oleh Admin.");
    localStorage.setItem("statusPendaftaran", "REVIEW");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white border-r border-gray-200 shrink-0">
        <div className="p-6">
          <div className="text-xl font-extrabold text-slate-900 tracking-tight mb-6">
            PMB <span className="text-amber-600">STIMATA</span>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">1. Informasi Jalur</p>
                <p className="text-xs text-slate-500">Jalur {jalur}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">2. Biodata Diri</p>
                <p className="text-xs text-slate-500">Data tersimpan</p>
              </div>
            </div>
            <div className="flex items-start gap-3 relative">
              <div className="absolute -left-3 top-2 w-1 h-8 bg-amber-500 rounded-r-full"></div>
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-sm font-bold text-amber-600">3. Dokumen Persyaratan</p>
                <p className="text-xs text-amber-500 font-medium">Upload berkas wajib</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Upload Dokumen Persyaratan</h1>
          <p className="text-slate-600 text-sm">
            Silakan unggah dokumen persyaratan sesuai dengan jalur pendaftaran Anda (<span className="font-semibold">{jalur}</span>). 
            Pastikan file dapat dibaca dengan jelas.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{errorMsg}</p>
          </div>
        )}

        {/* DOKUMEN WAJIB */}
        <div className="space-y-4">
          {documents.map((doc) => {
            const Icon = doc.icon;
            return (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <Icon className="w-6 h-6 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{doc.name}</h3>
                      <p className="text-xs text-slate-500">{doc.description}</p>
                    </div>
                  </div>

                  <div>
                    {doc.status === "BELUM" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        Belum Upload
                      </span>
                    )}
                    {doc.status === "TERUPLOAD" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Terupload
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {doc.status === "TERUPLOAD" && (
                    <div className="flex items-center gap-3 bg-slate-50 py-1.5 px-3 rounded-md border border-slate-200 max-w-xs truncate">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-sm text-slate-700 truncate">{doc.fileName}</span>
                    </div>
                  )}

                  {doc.status === "TERUPLOAD" && (
                    <button 
                      onClick={() => handlePreview(doc.fileName)}
                      className="inline-flex items-center text-sm text-slate-600 hover:text-amber-600 font-medium px-2 py-1 transition-colors">
                      <Eye className="w-4 h-4 mr-1.5" /> Preview
                    </button>
                  )}

                  <input
                    type="file"
                    id={`file-${doc.id}`}
                    className="hidden"
                    accept={doc.acceptedFormats}
                    onChange={(e) => handleFileChange(e, doc.id)}/>

                  <label 
                    htmlFor={`file-${doc.id}`}
                    className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors
                      ${doc.status === "BELUM" 
                        ? "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50" 
                        : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50" }`}>
                    {doc.status === "BELUM" ? (
                      <><UploadCloud className="w-4 h-4 mr-2" /> Pilih File</>
                    ) : (
                      <><RefreshCw className="w-4 h-4 mr-2" /> Upload Ulang</>
                    )}
                  </label>
                  
                </div>
              </div>
            );
          })}
        </div>

        {/* DOKUMEN OPSIONAL (SERTIFIKAT) */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Dokumen Pendukung (Opsional)</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <ImageIcon className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Sertifikat Organisasi / Prestasi</h3>
                  <p className="text-xs text-slate-500">Format .jpg / .png, max 2MB. (Maksimal 3 Gambar)</p>
                </div>
              </div>

              <div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  Opsional
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* LIST */}
              {certificates.length > 0 && (
                <div className="space-y-2 mb-2">
                  {certificates.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 py-2 px-3 rounded-md border border-slate-200 max-w-sm">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <ImageIcon className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-700 truncate">{cert.name}</span>
                      </div>
                      <button 
                        onClick={() => removeCertificate(index)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors"
                        title="Hapus" >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {certificates.length < 3 && (
                <div>
                  <input
                    type="file"
                    id="file-certificates"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    multiple 
                    onChange={handleCertificateChange}/>
                  <label 
                    htmlFor="file-certificates"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg cursor-pointer bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">
                    <UploadCloud className="w-4 h-4 mr-2" /> 
                    {certificates.length === 0 ? "Pilih Gambar" : "Tambah Gambar Lagi"}
                  </label>
                  <span className="ml-3 text-xs text-slate-500">
                    ({certificates.length}/3 Terupload)
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="text-slate-500 hover:text-slate-800 text-sm font-medium px-4 py-2"> Kembali
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={!isAllUploaded}
            className={`inline-flex items-center px-6 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${isAllUploaded 
                ? "bg-amber-500 text-white hover:bg-amber-600 shadow-sm" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
            Selesai & Kirim Dokumen <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </main>
    </div>
  );
}