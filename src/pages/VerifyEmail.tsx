import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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

const otpSchema = z.object({
  otp: z.string().length(6, { message: "Kode OTP wajib 6 digit angka!" }),
});

type OtpForm = z.infer<typeof otpSchema>;

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const emailTerdaftar = location.state?.email || "email Anda";

  const { register, handleSubmit, formState: { errors } } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    }
  });

  const onSubmit = async (data: OtpForm) => {
    setIsLoading(true);
    setApiError("");
    setTimeout(() => {
      setIsLoading(false);
      // testing gawe otp seng berhasil "123456"
      if (data.otp === "123456") {
        navigate("/login", { state: { successMessage: "Verifikasi berhasil! Silakan login." } });
      } else {
        setApiError("Kode OTP salah atau sudah kadaluarsa!");
      }
    }, 2000); 
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full max-w-[100vw] bg-slate-50 p-4 sm:p-6 overflow-hidden">
      <AuroraBackground />
      <Card className="w-full max-w-md shadow-2xl shadow-amber-900/10 border-t-4 border-t-amber-500 border-x-slate-200 border-b-slate-200 z-10 bg-white/80 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-900">Cek Email Anda!</CardTitle>
          <CardDescription className="text-center text-slate-600">
            Kami telah mengirimkan 6 digit kode OTP ke <br/>
            <span className="font-semibold text-amber-700">{emailTerdaftar}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-200">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-center block text-slate-700">Masukkan Kode Verifikasi</Label>
              <Input
                {...register("otp")}
                id="otp"
                type="text"
                maxLength={6}
                placeholder="• • • • • •"
                className={`bg-white/50 focus:bg-white transition-colors text-center tracking-widest text-2xl h-14 ${errors.otp ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-amber-500 border-slate-200"}`}
              />
              {errors.otp && <p className="text-red-500 text-xs mt-1 text-center">{errors.otp.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 mt-4 h-11 transition-all" disabled={isLoading}>
              {isLoading ? "Memeriksa..." : "Verifikasi Sekarang"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t border-slate-100 p-4 mt-2">
          <p className="text-sm text-slate-600">
            Belum menerima kode?{" "}
            <button type="button" className="text-amber-600 font-semibold hover:text-amber-700 hover:underline transition-colors" onClick={() => alert("Kode OTP baru telah dikirim!")}>
              Kirim ulang
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}