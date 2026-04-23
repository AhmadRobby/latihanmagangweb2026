import React, { useState, useMemo, useEffect } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Eye,
  Filter
} from "lucide-react";

// Tipe Data Pendaftar
interface Pendaftar {
  id: string;
  nama: string;
  jalur: string;
  status: string;
  tanggal: string;
}

// Dummy Data Pendaftar (pagination)
const MOCK_DATA: Pendaftar[] = [
  { id: "PMB25001", nama: "Ahmad Robby Bagus F", jalur: "Reguler", status: "Terverifikasi", tanggal: "2025-05-18" },
  { id: "PMB25002", nama: "Zaky Zain Abidin", jalur: "Reguler", status: "Lolos", tanggal: "2025-05-19" },
  { id: "PMB25003", nama: "Siti Aminah", jalur: "KIP Kuliah", status: "Menunggu Verifikasi", tanggal: "2025-05-19" },
  { id: "PMB25004", nama: "Budi Santoso", jalur: "KIP Kuliah", status: "Menunggu Pembayaran", tanggal: "2025-05-20" },
  { id: "PMB25005", nama: "Clara Shinta", jalur: "KIP Kuliah", status: "Terverifikasi", tanggal: "2025-05-20" },
  { id: "PMB25006", nama: "Deni Kurniawan", jalur: "Reguler", status: "Ditolak", tanggal: "2025-05-21" },
  { id: "PMB25007", nama: "Eka Putri", jalur: "Reguler", status: "Lolos", tanggal: "2025-05-21" },
  { id: "PMB25008", nama: "Fajar Siddiq", jalur: "KIP Kuliah", status: "Menunggu Verifikasi", tanggal: "2025-05-22" },
  { id: "PMB25009", nama: "Gita Gutawa", jalur: "Reguler", status: "Terverifikasi", tanggal: "2025-05-22" },
  { id: "PMB25010", nama: "Hadi Pranoto", jalur: "Reguler", status: "Menunggu Pembayaran", tanggal: "2025-05-22" },
  { id: "PMB25011", nama: "Indah Permata", jalur: "KIP Kuliah", status: "Lolos", tanggal: "2025-05-23" },
  { id: "PMB25012", nama: "Joko Anwar", jalur: "Reguler", status: "Terverifikasi", tanggal: "2025-05-23" },
];

export default function AdminPendaftar() {
  const navigate = useNavigate();
  useTitle("Halaman Data Pendaftar");
  // States untuk Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJalur, setFilterJalur] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State untuk Export
  const [isExporting, setIsExporting] = useState(false);

  // LOGIKA FILTER & SEARCH
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((p) => {
      const matchSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchJalur = filterJalur === "Semua" || p.jalur === filterJalur;
      const matchStatus = filterStatus === "Semua" || p.status === filterStatus;
      
      return matchSearch && matchJalur && matchStatus;
    });
  }, [searchQuery, filterJalur, filterStatus]);

  // LOGIKA PAGINATION
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Reset page ke 1 kalau filter/search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterJalur, filterStatus]);

  // SIMULASI EXPORT CSV
  const handleExportCSV = async () => {
    setIsExporting(true);
    
    // Simulasi Fetch ke GET /admin/export
    setTimeout(() => {
      const headers = ["Nomor Pendaftaran", "Nama", "Jalur", "Status", "Tanggal Daftar"];
      const csvContent = [
        headers.join(","),
        ...filteredData.map(p => `"${p.id}","${p.nama}","${p.jalur}","${p.status}","${p.tanggal}"`)
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `Data_Pendaftar_PMB_${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(false);
    }, 1500); // Simulasi delay 1.5 detik
  };

  // HELPER UNTUK WARNA STATUS
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Lolos": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Terverifikasi": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Menunggu Verifikasi": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Menunggu Pembayaran": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Ditolak": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      
      {/* HEADER PAGE */}
      <header className="bg-amber-600 border-b border-amber-700 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white tracking-tight">Data Pendaftar</h1>
          </div>
          <Button 
            onClick={() => navigate("/admin")} 
            variant="ghost" 
            className="text-amber-50 hover:text-white hover:bg-amber-700">
            Kembali ke Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* TOP BAR: Title & Export */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Daftar Calon Mahasiswa</h2>
            <p className="text-slate-500 mt-1">Kelola dan pantau seluruh data pendaftaran masuk.</p>
          </div>
          <Button 
            onClick={handleExportCSV} 
            disabled={isExporting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            {isExporting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Mengekspor...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" /> Export CSV
              </span>
            )}
          </Button>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-4 border-b border-slate-100 bg-white rounded-t-xl">
            {/* SEARCH & FILTERS */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Cari nama atau No. Pendaftaran..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 focus-visible:ring-amber-500"
                />
              </div>

              {/* Filters */}
              <div className="flex w-full md:w-auto gap-4 items-center md:ml-auto">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
                  <select 
                    className="flex h-10 w-full md:w-[160px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={filterJalur}
                    onChange={(e) => setFilterJalur(e.target.value)}
                  >
                    <option value="Semua">Semua Jalur</option>
                    <option value="Reguler">Reguler</option>
                    <option value="KIP Kuliah">KIP Kuliah</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <select 
                    className="flex h-10 w-full md:w-[200px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                    <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                    <option value="Terverifikasi">Terverifikasi</option>
                    <option value="Lolos">Lolos</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            {/* TABLE */}
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">No. Pendaftaran</th>
                  <th className="px-6 py-4 font-semibold">Nama Lengkap</th>
                  <th className="px-6 py-4 font-semibold">Jalur</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Tanggal Daftar</th>
                  <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((pendaftar, index) => (
                    <tr 
                      key={pendaftar.id} 
                      onClick={() => navigate(`/admin/pendaftar/${pendaftar.id}`)}
                      className={`border-b border-slate-100 hover:bg-amber-50 cursor-pointer transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{pendaftar.id}</td>
                      <td className="px-6 py-4 font-medium">{pendaftar.nama}</td>
                      <td className="px-6 py-4">{pendaftar.jalur}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(pendaftar.status)}`}>
                          {pendaftar.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{pendaftar.tanggal}</td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-amber-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      Tidak ada data pendaftar yang cocok dengan filter/pencarian Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white rounded-b-xl">
              <span className="text-sm text-slate-500">
                Menampilkan <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> dari <span className="font-medium text-slate-900">{filteredData.length}</span> pendaftar
              </span>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-slate-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <span className="text-sm font-medium text-slate-700 px-2">
                  {currentPage} / {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-slate-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>

      </main>
    </div>
  );
}