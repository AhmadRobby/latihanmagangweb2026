import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Loader2 } from 'lucide-react';
const FullScreenLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-blue-600">
    <Loader2 className="w-12 h-12 animate-spin mb-4" />
    <p className="font-medium text-slate-600">Mengecek sesi keamanan...</p>
  </div>
);

// PROTECTED ROUTE
export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <FullScreenLoader />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// ADMIN ROUTE
export const AdminRoute = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <FullScreenLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};