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
  <div className="relative flex items-center justify-center min-h-screen w-full max-w-[100vw] bg-gray-50 p-4 sm:p-6 overflow-hidden">
        <BackgroundAnimation />
        <Card className="w-full max-w-md shadow-lg border-t-4 border-indigo-600 z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Lupa Password?</CardTitle>
          <CardDescription className="text-center">
            Jangan panik! Masukkan email yang terdaftar dan kami akan mengirimkan tautan untuk reset password.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {apiError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center font-medium">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email Terdaftar</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="nama@email.com"
                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2" disabled={isLoading}>
              {isLoading ? "Mengirim Tautan..." : "Kirim Tautan Reset"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t p-4 mt-2">
          <p className="text-sm text-muted-foreground">
            Ingat password Anda?{" "}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Kembali ke Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}