"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

import AuthLayout from "./AuthLayout";

import {
  loginSchema,
  LoginSchemaType,
} from "../validation/loginSchema";

import { setToken } from "../utils/auth";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "@/modules/user/store/userStore";

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    // ============================================================
    // TODO: Aktifkan saat backend siap, hapus block "DUMMY" di bawah
    // ------------------------------------------------------------
    // POST http://localhost:8000/api/login
    // Body:    { email: string, password: string }
    // Success (200):
    //   { success: true,
    //     data: {
    //       user: { id, name, email, role },
    //       token: "eyJhbGciOi..."
    //     },
    //     message: "Login berhasil" }
    // Error (401): { success: false, message: "Email atau password salah" }
    // Error (422): { success: false, message: "...", errors: { email: [...] } }
    // ------------------------------------------------------------
    // import { login } from "../services/authServices";
    // try {
    //   const res = await login(data);
    //   const { user, token } = res.data.data;
    //   setUser(user);
    //   setToken(token);
    //   window.location.replace("/dashboard");
    // } catch (err: any) {
    //   setLoginError(err.response?.data?.message ?? "Gagal login");
    // }
    // ============================================================

    // ===== DUMMY (hapus saat API siap) =====
    const user = useUserStore
      .getState()
      .findByCredentials(data.email, data.password);

    if (!user) {
      setLoginError("Email atau password salah");
      return;
    }

    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    setToken("dummy-token");

    window.location.replace("/dashboard");
    // ===== END DUMMY =====
  };

  return (
    <AuthLayout>
      <h2 className="text-4xl font-bold text-gray-900 mb-8">
        Masuk
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

        {loginError && (
          <p className="text-red-500 text-sm">{loginError}</p>
        )}

        <div className="space-y-3 pt-4">
          <Button
            type="submit"
            text="Masuk"
            variant="primary"
          />

          <Button
            type="button"
            text="Buat Akun"
            variant="dark"
            onClick={() => router.push("/auth/register")}
          />
        </div>
      </form>
    </AuthLayout>
  );
}
