import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export default function Select({
  label,
  options,
  ...props
}: SelectProps) {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-base font-bold text-gray-900">
          {label}
        </label>
      )}

      <select
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
          appearance-none
          transition
          focus:ring-2
          focus:ring-[#F25C66]
          focus:border-[#F25C66]
        "
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
