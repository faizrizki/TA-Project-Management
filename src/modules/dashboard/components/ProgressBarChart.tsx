import { Project } from "@/modules/project/types/project";

interface ProgressBarChartProps {
  projects: Project[];
}

const BAR_COLORS = [
  "#E8DC6D",
  "#4FB7DE",
  "#E76A4A",
  "#3FAB6D",
  "#A26AE8",
];

export default function ProgressBarChart({ projects }: ProgressBarChartProps) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-10 text-center">
        Belum ada proyek untuk ditampilkan.
      </p>
    );
  }

  return (
    <div className="flex items-end gap-6 h-48 px-4 border-l-2 border-black">
      {projects.map((p, idx) => (
        <div
          key={p.id}
          className="flex-1 flex flex-col items-center gap-2"
          title={`${p.name} - ${p.progress}%`}
        >
          <div
            className="w-full rounded-t-md"
            style={{
              height: `${Math.max(p.progress, 4)}%`,
              backgroundColor: BAR_COLORS[idx % BAR_COLORS.length],
            }}
          />

          <span className="text-xs text-gray-700 truncate max-w-full">
            {p.name}
          </span>
        </div>
      ))}
    </div>
  );
}
