import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-green-600">
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

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-2" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Buat Akun"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t p-4 mt-2">
          <p className="text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}