import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion"; 

const AuroraBackground = () => {
  return (
  <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none w-screen h-screen bg-slate-50">
      <motion.div
        className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] bg-emerald-400/60 rounded-full filter blur-[100px] opacity-70"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-20%] w-[80vw] h-[80vw] bg-lime-300/50 rounded-full filter blur-[100px] opacity-60"
        animate={{
          x: [0, -120, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] bg-teal-400/50 rounded-full filter blur-[100px] opacity-60"
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
const signUpSchema = z.object({
  nama: z.string().min(3, { message: "Silahkan isi nama Anda!" }),
  email: z.string().min(1, { message: "Email wajib diisi!" }).email({ message: "Format email tidak valid!" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter biar aman!" }),
  confirmPassword: z.string().min(1, { message: "Konfirmasi password wajib diisi!" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password anda tidak sama, mohon coba lagi",
  path: ["confirmPassword"],
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nama: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    setApiError("");
    setTimeout(() => {
      setIsLoading(false);
      if (data.email === "robby@stimata.ac.id") {
        setApiError("Email ini sudah terdaftar!");
      } else {
        navigate("/verify-email", { state: { email: data.email } }); 
      }
    }, 2000); 
  };

  return (
  <div className="relative flex items-center justify-center min-h-screen w-full max-w-[100vw] bg-gray-50 p-4 overflow-hidden">
      <AuroraBackground />
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-green-600 z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Daftar Akun Baru</CardTitle>
        <CardDescription className="text-center">
          Isi data diri Anda untuk memulai pendaftaran.
        </CardDescription>
        </CardHeader>
        
        <CardContent>
          {apiError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center font-medium">
            {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-1">
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input {...register("nama")} id="nama" placeholder="Nama Lengkap" className={errors.nama ? "border-destructive" : ""}/>
            {errors.nama && <p className="text-destructive text-xs mt-1">{errors.nama.message}</p>}
            </div>

            <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} id="email" type="email" placeholder="nama@email.com" className={errors.email ? "border-destructive" : ""}/>
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
            <Label htmlFor="password">Password (Min. 6 Karakter)</Label>
            <Input {...register("password")} id="password" type="password" placeholder="••••••••" className={errors.password ? "border-destructive" : ""}/>
            {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="space-y-1">
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <Input {...register("confirmPassword")} id="confirmPassword" type="password" placeholder="••••••••" className={errors.confirmPassword ? "border-destructive" : ""}/>
            {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-2 h-11" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Buat Akun"}
            </Button>
            </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t p-4 mt-2">
          <p className="text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            {/* Ubah warna link login jadi ijo juga biar senada */}
            <Link to="/login" className="text-green-600 font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}