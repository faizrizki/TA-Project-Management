import {
  TaskStatus,
  TASK_STATUS_LABEL,
  TASK_STATUS_ORDER,
} from "@/modules/task/types/task";

interface TaskStatusDonutProps {
  counts: Record<TaskStatus, number>;
}

const STATUS_COLOR: Record<TaskStatus, string> = {
  TODO: "#9CA3AF",
  IN_PROGRESS: "#4FB7DE",
  REVIEW: "#E8DC6D",
  DONE: "#3FAB6D",
};

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function TaskStatusDonut({ counts }: TaskStatusDonutProps) {
  const total = TASK_STATUS_ORDER.reduce((sum, s) => sum + counts[s], 0);

  if (total === 0) {
    return (
      <p className="text-sm text-gray-500 py-10 text-center">
        Belum ada task untuk ditampilkan.
      </p>
    );
  }

  let offset = 0;
  const segments = TASK_STATUS_ORDER.map((status) => {
    const value = counts[status];
    const dash = (value / total) * CIRCUMFERENCE;
    const segment = {
      status,
      color: STATUS_COLOR[status],
      dash,
      gap: CIRCUMFERENCE - dash,
      offset: -offset,
      value,
    };
    offset += dash;
    return segment;
  });

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90">
        {segments.map((s) => (
          <circle
            key={s.status}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="transparent"
            stroke={s.color}
            strokeWidth="14"
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeDashoffset={s.offset}
          />
        ))}
      </svg>

      <ul className="space-y-2">
        {segments.map((s) => (
          <li key={s.status} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="font-medium text-gray-900">
              {TASK_STATUS_LABEL[s.status]}
            </span>
            <span className="text-gray-500">({s.value})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
