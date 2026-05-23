"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

import AuthLayout from "./AuthLayout";

import {
  registerSchema,
  RegisterSchemaType,
} from "../validation/registerSchema";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    // ============================================================
    // TODO: Aktifkan saat backend siap
    // ------------------------------------------------------------
    // POST http://localhost:8000/api/register
    // Body:    { email, password, confirmPassword }
    // Success (201):
    //   { success: true,
    //     data: { id, name, email, role: "TEAM_MEMBER" },
    //     message: "Akun berhasil dibuat" }
    // Error (422): { success: false, errors: { email: ["Email sudah terdaftar"] } }
    // ------------------------------------------------------------
    // import { register as registerUser } from "../services/authServices";
    // try {
    //   await registerUser(data);
    //   router.push("/auth/login");
    // } catch (err: any) {
    //   alert(err.response?.data?.message ?? "Gagal mendaftar");
    // }
    // ============================================================

    // ===== DUMMY (hapus saat API siap) =====
    console.log(data);
    router.push("/auth/login");
    // ===== END DUMMY =====
  };

  return (
    <AuthLayout>
      <h2 className="text-4xl font-bold text-gray-900 mb-8">
        Buat Akun
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Input
            type="email"
            label="Email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            label="Password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            label="Konfirmasi Password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            text="Daftar"
            variant="primary"
          />
        </div>
      </form>
    </AuthLayout>
  );
}
