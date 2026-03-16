import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Login from "./pages/Login"; 
import SignUp from "./pages/SignUp"; 
import VerifyEmail from "./pages/VerifyEmail"; 
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import DaftarPilihJalur from "./pages/DaftarPilihJalur"; 
import ResetPassword from "./pages/ResetPassword";

import { useAuthStore } from "@/stores/authStore"; 
import { ProtectedRoute, AdminRoute } from "@/components/routes/GuardRoutes"; 

// --- dasbor dummy ---
function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">🎉 Selamat Datang di Dashboard!</h1>
        <p className="text-slate-600">Halo <span className="font-bold text-blue-600">{user?.name}</span>, yuk lengkapi pendaftaran Anda!.</p>
      </div>

      <Link to="/daftar">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-14 text-lg rounded-full shadow-lg hover:shadow-blue-500/30 transition-all">
          Mulai Pendaftaran Sekarang
        </Button>
      </Link>

      <Button variant="link" onClick={handleLogout} className="text-red-500 font-medium hover:underline mt-8">
        Keluar (Logout)
      </Button>
    </div>
  );
}

// dummy bio
function FormBiodataPage() {
  const navigate = useNavigate();
  const jalurPilihan = localStorage.getItem("jalurPilihan") || "Belum memilih";

  const handleResetJalur = () => {
    localStorage.removeItem("statusPendaftaran");
    localStorage.removeItem("jalurPilihan");
    navigate("/daftar");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-slate-50 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Formulir Pendaftaran</h1>
        <p className="text-slate-600">
          Anda sedang mendaftar melalui jalur: <span className="font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{jalurPilihan}</span>
        </p>
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col gap-4">
        <p className="text-center text-sm text-slate-500 mb-4">
          (isian form nama, asal sekolah, dll)
        </p>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Lanjut Simpan Biodata
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleResetJalur} 
          className="w-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 border-none">
          Salah Pilih? Ganti Jalur Pendaftaran
        </Button>
      </div>

      <Link to="/dashboard">
        <Button variant="link" className="text-slate-500 hover:text-slate-800">
          Kembali ke Dashboard
        </Button>
      </Link>
    </div>
  );
}

// dummy admin
function AdminPanelDummy() {
  const { logout } = useAuthStore();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-purple-50 p-6">
      <h1 className="text-3xl font-bold text-purple-800">👮‍♂️ Halo Bapak Admin</h1>
      <p>Ini halaman khusus admin, mahasiswa nggak bisa masuk sini.</p>
      <Button onClick={() => logout()} variant="destructive">Logout Admin</Button>
    </div>
  );
}

// route
function App() {
 
  const checkAuth = useAuthStore((state) => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/daftar" element={<DaftarPilihJalur />} />
          <Route path="/daftar/form" element={<FormBiodataPage />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPanelDummy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;