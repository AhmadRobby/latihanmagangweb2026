import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none w-screen h-screen bg-gray-50">
      <motion.div
        className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-blue-500/70 rounded-full filter blur-2xl opacity-80"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-20%] w-[90vw] h-[90vw] bg-cyan-400/60 rounded-full filter blur-2xl opacity-70"
        animate={{
          x: [0, -120, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
      />
      <motion.div
        className="absolute top-[30%] left-[10%] w-[60vw] h-[60vw] bg-indigo-500/50 rounded-full filter blur-xl opacity-60"
        animate={{
            x: [0, 80, -40, 0],
          y: [0, 90, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 4 
        }}
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);

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
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50 p-4 overflow-hidden">
    <BackgroundAnimation />
   <Card className="w-full max-w-md shadow-lg border-t-4 border-indigo-600 z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Buat Password Baru</CardTitle>
          <CardDescription className="text-center">
            Silakan masukkan password baru Anda di bawah ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center font-medium">
              {apiError}
            </div>
          )}
          {isTokenInvalid ? (
             <div className="flex justify-center mt-4">
               <Link to="/forgot-password">
                 <Button className="bg-indigo-600 hover:bg-indigo-700">Request Link Baru</Button>
               </Link>
             </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="password">Password Baru</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password baru"
                  className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-4" disabled={isLoading}>
                {isLoading ? "Menyimpan Password..." : "Simpan Password Baru"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}