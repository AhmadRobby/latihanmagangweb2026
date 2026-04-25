import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login"; 
import SignUp from "./pages/SignUp"; 
import VerifyEmail from "./pages/VerifyEmail"; 
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPendaftar from "./pages/admin/AdminPendaftar";
import AdminDetailPendaftar from "./pages/admin/AdminDetailPendaftar";
import AdminSeleksi from "./pages/admin/AdminSeleksi";
import AdminPembayaran from "./pages/admin/AdminPembayaran"; 
import AdminDokumen from "./pages/admin/AdminDokumen";

import LandingPage from "./pages/LandingPage";
import DaftarPilihJalur from "./pages/daftar/DaftarPilihJalur"; 
import PendaftaranForm from "./pages/daftar/PendaftaranForm"; 
import DashboardMahasiswa from "./pages/DashboardMahasiswa"; 
import UploadDokumen from "./pages/daftar/UploadDokumen";
import Pembayaran from "./pages/daftar/Pembayaran";
import StatusPembayaran from "./pages/daftar/StatusPembayaran"; 
import PengumumanKip from "./pages/daftar/PengumumanKip";

import { useAuthStore } from "@/stores/authStore"; 
import { ProtectedRoute, AdminRoute } from "@/components/routes/GuardRoutes"; 

// --- MAIN APP COMPONENT ---
function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  
  // Cek sesi user saat aplikasi pertama kali di-load
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
          <Route path="/dashboard" element={<DashboardMahasiswa />} /> 
          <Route path="/daftar" element={<DaftarPilihJalur />} />
          <Route path="/daftar/form" element={<PendaftaranForm />} />
          <Route path="/daftar/dokumen" element={<UploadDokumen />} />
          <Route path="/daftar/pembayaran" element={<Pembayaran />} />
          <Route path="/daftar/pembayaran/status" element={<StatusPembayaran />} />
          <Route path="/pengumuman" element={<PengumumanKip />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pendaftar" element={<AdminPendaftar />} />
          <Route path="/admin/pendaftar/:id" element={<AdminDetailPendaftar />} />
          <Route path="/admin/seleksi" element={<AdminSeleksi />} />
          <Route path="/admin/pembayaran" element={<AdminPembayaran />} />
          <Route path="/admin/dokumen" element={<AdminDokumen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;