import { useState, useEffect } from "react";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const AuroraBackground = () => {
  return (
  <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none w-screen h-screen bg-slate-50">
      <motion.div
        className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] bg-amber-400/40 rounded-full filter blur-[100px] opacity-70"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-20%] w-[80vw] h-[80vw] bg-orange-400/30 rounded-full filter blur-[100px] opacity-60"
        animate={{
          x: [0, -120, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] bg-amber-600/20 rounded-full filter blur-[100px] opacity-60"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 90, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
};

const resetPasswordSchema = z.object({
password: z.string().min(6, { message: "Password minimal 6 karakter!" }),
confirmPassword: z.string().min(6, { message: "Konfirmasi password minimal 6 karakter!" }),
}).refine((data) => data.password === data.confirmPassword, {
message: "Password tidak cocok!",
path: ["confirmPassword"], 
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  useTitle("Reset Password");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  // Validate awal: cek apakah ada token di URL saat halaman dibukak
  useEffect(() => {
    if (!token) {
      setIsTokenInvalid(true);
      setApiError("Akses ditolak. Token reset password tidak ditemukan.");
    }
  }, [token]);

  // ( http://localhost:3000/reset-password?token=123xyz ) gawe liat tampilan e

  const onSubmit = async (data: ResetPasswordForm) => {
    setIsLoading(true);
    setApiError("");
    
    // Pengsimulasi API Reset Password..
    setTimeout(() => {
      setIsLoading(false);
      
    // Simulasi ngecek token valid/kedaluwarsa 
      if (token === "invalid") {
        setApiError("Token sudah kedaluwarsa. Silakan request link reset baru.");
        setIsTokenInvalid(true);
      } else {
        navigate("/login", { 
          state: { successMessage: "Password telah berhasil diubah! Silakan login dengan password baru Anda." } 
        });
      }
    }, 2000); 
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full max-w-[100vw] bg-slate-50 p-4 sm:p-6 overflow-hidden">
    <AuroraBackground />
    
   <Card className="w-full max-w-md shadow-2xl shadow-amber-900/10 border-t-4 border-t-amber-500 border-x-slate-200 border-b-slate-200 z-10 bg-white/80 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-900">Buat Password Baru</CardTitle>
          <CardDescription className="text-center text-slate-600">
            Silakan masukkan password baru Anda di bawah ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-200">
              {apiError}
            </div>
          )}
          {isTokenInvalid ? (
             <div className="flex justify-center mt-4 pb-2">
               <Link to="/forgot-password" className="w-full">
                 <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 h-11 transition-all">
                   Request Link Baru
                 </Button>
               </Link>
             </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-2">
              <div className="space-y-1">
                <Label htmlFor="password" className="text-slate-700">Password Baru</Label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 6 karakter"
                    className={`bg-white/50 focus:bg-white transition-colors pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-amber-500 border-slate-200"}`}/>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-600 focus:outline-none transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-slate-700">Konfirmasi Password Baru</Label>
                <div className="relative">
                  <Input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password baru"
                    className={`bg-white/50 focus:bg-white transition-colors pr-10 ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-amber-500 border-slate-200"}`}/>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-600 focus:outline-none transition-colors">
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 mt-4 h-11 transition-all" disabled={isLoading}>
                {isLoading ? "Menyimpan Password..." : "Simpan Password Baru"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}