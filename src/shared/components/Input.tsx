interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}