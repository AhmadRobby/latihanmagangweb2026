import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";


import Login from "./pages/Login"; 
import SignUp from "./pages/SignUp"; 
import VerifyEmail from "./pages/VerifyEmail"; 
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import LandingPage from "./pages/LandingPage";
import DaftarPilihJalur from "./pages/DaftarPilihJalur"; 
import PendaftaranForm from "./pages/PendaftaranForm"; 
import DashboardMahasiswa from "./pages/DashboardMahasiswa"; 


import { useAuthStore } from "@/stores/authStore"; 
import { ProtectedRoute, AdminRoute } from "@/components/routes/GuardRoutes"; 

// --- dummy admin  ---
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