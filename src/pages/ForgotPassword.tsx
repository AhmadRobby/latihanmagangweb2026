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

const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email wajib diisi!" }).email({ message: "Format email tidak valid!" }),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    setApiError("");
    
    // simulasi ngecek email ke database
    setTimeout(() => {
      setIsLoading(false);
      if (data.email === "robby@stimata.ac.id") {
      // jika email ada, go to Login dan muncul pesan sukses
        navigate("/login", { state: { successMessage: "Link reset telah dikirim ke email Anda" } });
      } else {
      // lek semisal email gaada
        setApiError("Email tidak terdaftar di sistem kami.");
      }
    }, 2000); 
  };

  return (
  <div className="relative flex items-center justify-center min-h-screen w-full max-w-[100vw] bg-slate-50 p-4 sm:p-6 overflow-hidden">
        <AuroraBackground />
        
        <Card className="w-full max-w-md shadow-2xl shadow-amber-900/10 border-t-4 border-t-amber-500 border-x-slate-200 border-b-slate-200 z-10 bg-white/80 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-900">Lupa Password?</CardTitle>
          <CardDescription className="text-center text-slate-600">
            Jangan panik! Masukkan email yang terdaftar dan kami akan mengirimkan tautan untuk reset password.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-200">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-slate-700">Email Terdaftar</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="nama@email.com"
                className={`bg-white/50 focus:bg-white transition-colors ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-amber-500 border-slate-200"}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 mt-4 h-11 transition-all" disabled={isLoading}>
              {isLoading ? "Mengirim Tautan..." : "Kirim Tautan Reset"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t border-slate-100 p-4 mt-2">
          <p className="text-sm text-slate-600">
            Ingat password Anda?{" "}
            <Link to="/login" className="text-amber-600 font-semibold hover:text-amber-700 hover:underline transition-colors">
              Kembali ke Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}