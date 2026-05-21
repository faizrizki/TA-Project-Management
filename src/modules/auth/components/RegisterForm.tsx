"use client";

import Link from "next/link";
import { useState } from "react";

import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function RegisterForm() {
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] p-6">
      <div className="w-full max-w-5xl h-[700px] bg-[#d9d9d9] rounded-[30px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

        {/* LEFT */}
        <div className="bg-red-600 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-black">
            Project Management
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center px-10 py-10 overflow-y-auto">
          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold mb-2">
              Buat Akun
            </h2>

            <p className="text-gray-700 mb-8">
              Silakan daftar untuk membuat akun
            </p>

            <form className="space-y-5">

              <Input
                type="email"
                label="Email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <Input
                type="password"
                label="Password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <Input
                type="password"
                label="Konfirmasi Password"
                placeholder="Konfirmasi password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="w-full bg-white border border-gray-300 py-4 rounded-xl font-medium hover:bg-gray-100 transition"
              >
                Login menggunakan Google
              </button>

              <Button
                type="submit"
                text="Konfirmasi"
              />

            </form>

            <p className="text-center mt-6 text-sm">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login"
                className="text-red-600 font-semibold"
              >
                Masuk di sini
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}