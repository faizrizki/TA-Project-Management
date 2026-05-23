import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  label,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-base font-bold text-gray-900">
          {label}
        </label>
      )}

      <input
        {...props}
        className="
          w-full
          px-5
          py-3
          rounded-full
          border
          border-black
          bg-white
          outline-none
          text-base
          transition
          focus:ring-2
          focus:ring-[#F25C66]
          focus:border-[#F25C66]
        "
      />
    </div>
  );
}
