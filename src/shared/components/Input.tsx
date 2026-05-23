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
      <label className="block mb-3 text-base font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          px-5
          py-4
          rounded-2xl
          border
          border-gray-300
          bg-white
          outline-none
          text-lg
          transition
          focus:ring-2
          focus:ring-red-500
          focus:border-red-500
        "
      />
    </div>
  );
}