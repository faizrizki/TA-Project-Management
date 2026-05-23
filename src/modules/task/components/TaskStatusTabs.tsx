"use client";

import {
  TaskStatus,
  TASK_STATUS_LABEL,
  TASK_STATUS_ORDER,
} from "../types/task";

interface TaskStatusTabsProps {
  active: TaskStatus;
  counts: Record<TaskStatus, number>;
  onChange: (status: TaskStatus) => void;
}

const TAB_CLASS: Record<TaskStatus, string> = {
  TODO: "bg-gray-200 text-gray-900",
  IN_PROGRESS: "bg-[#B6DCFE] text-gray-900",
  REVIEW: "bg-[#E8DC6D] text-gray-900",
  DONE: "bg-[#A5EE8A] text-gray-900",
};

export default function TaskStatusTabs({
  active,
  counts,
  onChange,
}: TaskStatusTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TASK_STATUS_ORDER.map((status) => {
        const isActive = active === status;

        return (
          <button
            key={status}
            type="button"
            onClick={() => onChange(status)}
            className={`
              inline-flex items-center gap-2
              p-2 px-6
              rounded-full
              text-sm font-semibold
              transition
              ${TAB_CLASS[status]}
              ${isActive ? "ring-2 ring-black" : "opacity-70 hover:opacity-100"}
            `}
          >
            <span>{TASK_STATUS_LABEL[status]}</span>
            <span className="bg-white/70 text-gray-900 rounded-full px-2 text-xs">
              {counts[status]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
