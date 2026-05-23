"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

import {
  loginSchema,
  LoginSchemaType,
} from "../validation/loginSchema";

import { setToken } from "../utils/auth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (
    data: LoginSchemaType
  ) => {
    console.log(data);

    setToken("dummy-token");

    window.location.replace("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-4 py-10">

      <div
        className="
          w-full
          max-w-7xl
          min-h-[700px]
          bg-[#f5f5f5]
          rounded-[40px]
          overflow-hidden
          shadow-2xl
          grid
          grid-cols-1
          md:grid-cols-2
        "
      >

        {/* LEFT */}
        <div
          className="
            bg-red-600
            flex
            flex-col
            items-center
            justify-center
            px-10
            py-16
          "
        >
          <h1
            className="
              text-6xl
              font-extrabold
              text-white
              text-center
              leading-tight
            "
          >
            Project
            <br />
            Management
          </h1>

          <p
            className="
              text-white/90
              text-center
              mt-8
              max-w-md
              text-xl
              leading-relaxed
            "
          >
            Kelola proyek, task, dan kolaborasi tim
            dengan lebih efektif.
          </p>
        </div>

        {/* RIGHT */}
        <div
          className="
            flex
            items-center
            justify-center
            px-8
            py-14
            md:px-20
          "
        >
          <div className="w-full max-w-xl">

            <div className="mb-10">
              <h2 className="text-5xl font-bold text-gray-900">
                Masuk
              </h2>

              <p className="text-gray-500 mt-3 text-lg">
                Silakan login untuk melanjutkan
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >

              {/* EMAIL */}
              <div>
                <Input
                  type="email"
                  label="Email"
                  placeholder="Masukkan email"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <Input
                  type="password"
                  label="Password"
                  placeholder="Masukkan password"
                  {...register("password")}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                text="Masuk"
              />
            </form>

            <p className="text-center text-base mt-8 text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/auth/register"
                className="
                  text-red-600
                  font-semibold
                  hover:underline
                "
              >
                Daftar sekarang
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}