interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function Button({
  text,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 rounded-xl"
    >
      {text}
    </button>
  );
}