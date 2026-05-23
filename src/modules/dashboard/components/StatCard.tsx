import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  hint,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-[#F6F6F6] rounded-[20px] p-7 shadow-[5px_6px_6.9px_rgba(0,0,0,0.12)]">
      <div className="flex items-start justify-between mb-6">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <span className="text-gray-700">{icon}</span>
      </div>

      <p className="text-3xl font-bold text-gray-900">{value}</p>

      {hint && <p className="text-xs text-gray-600 mt-2">{hint}</p>}
    </div>
  );
}
