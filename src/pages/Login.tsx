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
      if (data.email === "robby@stimata.ac.id" && data.password === "123456") {
         loginAction({ 
           id: "1", 
           name: "Robby", 
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
    <div className="relative flex items-center justify-center min-h-screen w-full max-w-[100vw] bg-gray-50 p-4 sm:p-6 overflow-hidden">
      <BackgroundAnimation />
        <Card className="w-full max-w-md shadow-2xl border-t-4 border-blue-600 z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl font-bold text-center"> 
          Selamat Datang, Calon Mahasiswa Baru!
        </CardTitle>
        <CardDescription className="text-center">
          Masukkan email dan password yang telah Anda daftarkan!
        </CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded-lg text-center font-medium border border-green-200">
              ✅ {successMessage}
            </div>
          )}

          {apiError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center font-medium">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="nama@email.com"
                className={errors.email ? "border-destructive focus:ring-destructive" : ""}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                  Lupa password?
                </Link>
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="( 6 Huruf )"
                className={errors.password ? "border-destructive focus:ring-destructive" : ""}
              />
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-2" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t p-4 mt-2">
        <p className="text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Daftar dulu di sini
            </Link>
        </p>
        </CardFooter>
      </Card>
    </div>
  );
}