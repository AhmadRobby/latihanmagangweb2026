import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-yellow-500">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Cek Email Anda!</CardTitle>
          <CardDescription className="text-center">
            Kami telah mengirimkan 6 digit kode OTP ke <br/>
            <span className="font-semibold text-gray-800">{emailTerdaftar}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {apiError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center font-medium">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-center block">Masukkan Kode Verifikasi</Label>
              <Input
                {...register("otp")}
                id="otp"
                type="text"
                maxLength={6}
                placeholder="• • • • • •"
                className={`text-center tracking-widest text-2xl h-14 ${errors.otp ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.otp && <p className="text-destructive text-xs mt-1 text-center">{errors.otp.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white mt-2" disabled={isLoading}>
              {isLoading ? "Memeriksa..." : "Verifikasi Sekarang"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t p-4 mt-2">
          <p className="text-sm text-muted-foreground">
            Belum menerima kode?{" "}
            <button className="text-blue-600 font-medium hover:underline" onClick={() => alert("Kode OTP baru telah dikirim!")}>
              Kirim ulang
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}