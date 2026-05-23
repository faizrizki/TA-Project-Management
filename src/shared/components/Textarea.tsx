import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({
  label,
  ...props
}: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-base font-bold text-gray-900">
          {label}
        </label>
      )}

      <textarea
        {...props}
        rows={props.rows ?? 4}
        className="
          w-full
          px-5
          py-3
          rounded-3xl
          border
          border-black
          bg-white
          outline-none
          text-base
          resize-none
          transition
          focus:ring-2
          focus:ring-[#F25C66]
          focus:border-[#F25C66]
        "
      />
    </div>
  );
}
