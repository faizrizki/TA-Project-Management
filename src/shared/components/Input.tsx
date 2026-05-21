interface InputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function Input({
  type = "text",
  placeholder,
  label,
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}