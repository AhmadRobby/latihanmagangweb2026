import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


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
        navigate("/", { state: { successMessage: "Instruksi reset password telah dikirim ke email Anda!" } });
      } else {
        // lek semisal email gaada
        setApiError("Email tidak terdaftar di sistem kami.");
      }
    }, 2000); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-indigo-600">
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