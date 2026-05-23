import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex items-stretch">
      {/* LEFT - BRAND PANEL */}
      <div
        className="
          hidden
          md:flex
          w-1/2
          bg-[#F25C66]
          rounded-r-[40px]
          items-center
          justify-center
          px-10
        "
      >
        <h1
          className="
            text-white
            text-6xl
            font-extrabold
            text-center
            leading-tight
          "
          style={{
            WebkitTextStroke: "2px #000",
          }}
        >
          Project
          <br />
          Management
        </h1>
      </div>

      {/* RIGHT - FORM PANEL */}
      <div
        className="
          w-full
          md:w-1/2
          flex
          items-center
          justify-center
          px-6
          py-12
          md:px-20
        "
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
