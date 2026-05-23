import { ReactNode } from "react";

type ButtonVariant = "primary" | "dark" | "secondary" | "success";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "bg-[#F25C66] hover:bg-[#e04550] text-white",
  dark: "bg-[#2b2b2b] hover:bg-black text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  success: "bg-[#7DD957] hover:bg-[#6cc548] text-white",
};

export default function Button({
  text,
  type = "button",
  variant = "primary",
  icon,
  fullWidth = true,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        p-2
        rounded-full
        font-semibold
        text-base
        transition
        ${fullWidth ? "w-full" : "px-6"}
        ${VARIANT_CLASS[variant]}
      `}
    >
      {icon}
      {text}
    </button>
  );
}
