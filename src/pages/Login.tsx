import { useState } from "react";
import { useAuthStore } from '@/stores/authStore';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

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
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}/>
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

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email wajib diisi!" }).email({ message: "Format email tidak valid!" }),
  password: z.string().min(1, { message: "Password nggak boleh kosong!" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(""); 
  
  const [showPassword, setShowPassword] = useState(false);

  const loginAction = useAuthStore((state) => state.login);
  const successMessage = location.state?.successMessage;

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setApiError("");
    
    // Simulasi loading API 2 detik
    setTimeout(() => {
      setIsLoading(false);
      
      // AKUN MAHASISWA
      if (data.email === "robby@gmail.com" && data.password === "123456") {
         loginAction({ 
           id: "1", 
           name: "Ahmad Robby Bagus F", 
           email: data.email, 
           role: "MHS" 
         });
         navigate("/dashboard");
      } 
      if (data.email === "zaky@gmail.com" && data.password === "123456") {
         loginAction({ 
           id: "3", 
           name: "Zaky Zain Abidin", 
           email: data.email, 
           role: "MHS" 
         });
         navigate("/dashboard");
      } 
      // AKUN ADMIN
      else if (data.email === "ahmad@stimata.ac.id" && data.password === "admin123") {
         loginAction({ 
           id: "2", 
           name: "Bapak Ahmad", 
           email: data.email, 
           role: "ADMIN" 
         });
         navigate("/admin");
      } else {
         setApiError("Email atau password salah. Silakan coba lagi!");
      }
    }, 2000); 
  };

 return (
    <div className="relative flex items-center justify-center min-h-screen w-full max-w-[100vw] bg-slate-50 p-4 sm:p-6 overflow-hidden">
      <AuroraBackground />

      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-amber-600 bg-white/60 hover:bg-white/80 backdrop-blur-md py-2 px-4 rounded-full border border-slate-200 shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Halaman Utama
      </Link>
      
        <Card className="w-full max-w-md shadow-2xl shadow-amber-900/10 border-t-4 border-t-amber-500 border-x-slate-200 border-b-slate-200 z-10 bg-white/80 backdrop-blur-md mt-10 sm:mt-0">
        <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl font-bold text-center text-slate-900"> 
          Selamat Datang, Calon Mahasiswa Baru!
        </CardTitle>
        <CardDescription className="text-center text-slate-600">
          Masukkan email dan password yang telah Anda daftarkan!
        </CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-lg text-center font-medium border border-emerald-200">
              ✅ {successMessage}
            </div>
          )}

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-200">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="nama@email.com"
                className={`bg-white/50 focus:bg-white transition-colors ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-amber-500 border-slate-200"}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Link to="/forgot-password" className="text-xs text-amber-600 hover:text-amber-700 hover:underline transition-colors">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className={`bg-white/50 focus:bg-white transition-colors pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-amber-500 border-slate-200"}`}/>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-600 focus:outline-none transition-colors">
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 mt-4 h-11 transition-all" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t border-slate-100 p-4 mt-2">
        <p className="text-sm text-slate-600">
            Belum punya akun?{" "}
            <Link to="/signup" className="text-amber-600 font-semibold hover:text-amber-700 hover:underline transition-colors">
            Daftar dulu di sini
            </Link>
        </p>
        </CardFooter>
      </Card>
    </div>
  );
}