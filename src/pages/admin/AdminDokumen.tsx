import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Search, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText,
  Save,
  Check
} from "lucide-react";

// Tipe Data Dummy
type DocStatus = "PENDING" | "APPROVED" | "REJECTED";

interface Document {
  id: string;
  name: string;
  status: DocStatus;
  note: string;
}

interface Applicant {
  id: string;
  regNumber: string;
  name: string;
  track: string;
  submittedAt: string;
  documents: Document[];
}

// Data Dummy
const MOCK_APPLICANTS: Applicant[] = [
  {
    id: "1",
    regNumber: "PMB25010",
    name: "Siti Aminah",
    track: "KIP Kuliah",
    submittedAt: "24 Mei 2026, 09:15",
    documents: [
      { id: "d1", name: "KTP / Kartu Pelajar", status: "PENDING", note: "" },
      { id: "d2", name: "Kartu Keluarga (KK)", status: "PENDING", note: "" },
      { id: "d3", name: "Ijazah / SKL", status: "PENDING", note: "" },
      { id: "d4", name: "Pas Foto 3x4", status: "PENDING", note: "" },
    ]
  },
  {
    id: "2",
    regNumber: "PMB25011",
    name: "Budi Santoso",
    track: "Reguler",
    submittedAt: "24 Mei 2026, 10:30",
    documents: [
      { id: "d1", name: "KTP / Kartu Pelajar", status: "PENDING", note: "" },
      { id: "d2", name: "Kartu Keluarga (KK)", status: "PENDING", note: "" },
      { id: "d3", name: "Ijazah / SKL", status: "PENDING", note: "" },
      { id: "d4", name: "Pas Foto 3x4", status: "PENDING", note: "" },
    ]
  }
];

export default function AdminDokumen() {
  useTitle("Review Berkas - Admin");
  const navigate = useNavigate();
  
  const [applicants, setApplicants] = useState<Applicant[]>(MOCK_APPLICANTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  // Filter pencarian
  const filteredApplicants = applicants.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.regNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle perubahan status dokumen
  const handleDocStatusChange = (docId: string, newStatus: DocStatus, note: string = "") => {
    if (!selectedApplicant) return;

    const updatedDocs = selectedApplicant.documents.map(doc => 
      doc.id === docId ? { ...doc, status: newStatus, note: newStatus === "REJECTED" ? note : "" } : doc
    );

    setSelectedApplicant({ ...selectedApplicant, documents: updatedDocs });
  };

  // Handle Simpan Hasil Review
  const handleSaveReview = () => {
    if (!selectedApplicant) return;

    // Cek ada dokumen yang PENDING atau tidakk
    const hasPending = selectedApplicant.documents.some(d => d.status === "PENDING");
    if (hasPending) {
      alert("Harap periksa semua dokumen sebelum menyimpan!");
      return;
    }

    // Update state utama
    setApplicants(prev => prev.filter(app => app.id !== selectedApplicant.id));
    
    // Tampilkan notifikasi & kembali ke list
    alert(`Hasil review untuk ${selectedApplicant.name} berhasil disimpan!`);
    setSelectedApplicant(null);
  };

  // LIST PENDAFTAR
  if (!selectedApplicant) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/admin')} className="text-slate-500 hover:text-amber-600 -ml-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-bold text-slate-900">Verifikasi Dokumen</h1>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-semibold">Antrean Verifikasi</CardTitle>
                <CardDescription>Pendaftar yang telah mengunggah dokumen dan menunggu persetujuan.</CardDescription>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama atau No. Reg..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredApplicants.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p>Tidak ada dokumen yang perlu diverifikasi saat ini.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                        <th className="p-4 font-semibold">No. Registrasi</th>
                        <th className="p-4 font-semibold">Nama Pendaftar</th>
                        <th className="p-4 font-semibold">Jalur</th>
                        <th className="p-4 font-semibold">Waktu Submit</th>
                        <th className="p-4 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApplicants.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-mono text-sm font-medium text-slate-900">{app.regNumber}</td>
                          <td className="p-4 font-semibold text-slate-800">{app.name}</td>
                          <td className="p-4 text-sm"><span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">{app.track}</span></td>
                          <td className="p-4 text-sm text-slate-500">{app.submittedAt}</td>
                          <td className="p-4 text-right">
                            <Button 
                              onClick={() => setSelectedApplicant(app)}
                              className="bg-amber-100 text-amber-700 hover:bg-amber-200 shadow-none border-none h-8 px-3">
                              <Eye className="w-4 h-4 mr-2" /> Review
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // DETAIL REVIEW DOKUMEN
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedApplicant(null)} className="text-slate-500 hover:text-amber-600 -ml-2">
              <ArrowLeft className="w-5 h-5" /> Kembali
            </Button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">Review Dokumen: {selectedApplicant.name}</h1>
              <p className="text-xs text-slate-500">{selectedApplicant.regNumber} • {selectedApplicant.track}</p>
            </div>
          </div>
          <Button onClick={handleSaveReview} className="bg-amber-500 hover:bg-amber-600 text-white">
            <Save className="w-4 h-4 mr-2" /> Simpan Hasil
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedApplicant.documents.map((doc) => (
            <Card key={doc.id} className={`shadow-sm transition-colors border-2 ${
              doc.status === "APPROVED" ? "border-emerald-200 bg-emerald-50/30" : 
              doc.status === "REJECTED" ? "border-red-200 bg-red-50/30" : 
              "border-transparent bg-white"
            }`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <h3 className="font-semibold text-slate-800">{doc.name}</h3>
                  </div>
                  
                  {/* Status Badge */}
                  {doc.status === "APPROVED" && <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded uppercase flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> OK</span>}
                  {doc.status === "REJECTED" && <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase flex items-center"><XCircle className="w-3 h-3 mr-1"/> Tolak</span>}
                  {doc.status === "PENDING" && <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded uppercase">Belum Dicek</span>}
                </div>

                {/* Simulasi Preview Dokumen */}
                <div className="w-full h-40 bg-slate-100 border border-slate-200 rounded-md flex items-center justify-center mb-4 cursor-pointer hover:bg-slate-200 transition-colors">
                  <div className="text-center">
                    <Eye className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <span className="text-sm font-medium text-slate-500">Klik untuk lihat file</span>
                  </div>
                </div>

                {/* Aksi Verifikasi */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDocStatusChange(doc.id, "APPROVED")}
                      variant={doc.status === "APPROVED" ? "default" : "outline"}
                      className={`flex-1 ${doc.status === "APPROVED" ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white" : "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 text-slate-600"}`}>
                      <Check className="w-4 h-4 mr-2" /> Terima
                    </Button>
                    <Button 
                      onClick={() => {
                        const reason = prompt("Masukkan alasan penolakan (misal: Gambar buram):");
                        if (reason !== null) handleDocStatusChange(doc.id, "REJECTED", reason);
                      }}
                      variant={doc.status === "REJECTED" ? "default" : "outline"}
                      className={`flex-1 ${doc.status === "REJECTED" ? "bg-red-500 hover:bg-red-600 border-red-500 text-white" : "hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-600"}`}>
                      <XCircle className="w-4 h-4 mr-2" /> Tolak
                    </Button>
                  </div>

                  {/* Tampilkan catatan jika ditolak */}
                  {doc.status === "REJECTED" && (
                    <div className="p-3 bg-white border border-red-100 rounded-md flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-red-700 uppercase mb-0.5">Catatan Penolakan:</p>
                        <p className="text-sm text-slate-700">{doc.note}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}