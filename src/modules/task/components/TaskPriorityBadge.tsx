import {
  TaskPriority,
  TASK_PRIORITY_LABEL,
} from "../types/task";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

const PRIORITY_CLASS: Record<TaskPriority, string> = {
  LOW: "bg-[#A5EE8A] text-gray-900",
  MEDIUM: "bg-[#E8DC6D] text-gray-900",
  HIGH: "bg-[#F25C66] text-white",
};

export default function TaskPriorityBadge({
  priority,
}: TaskPriorityBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        rounded-full
        text-xs font-semibold
        ${PRIORITY_CLASS[priority]}
      `}
    >
      {TASK_PRIORITY_LABEL[priority]}
    </span>
  );
}
