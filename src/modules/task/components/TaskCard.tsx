import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCalendar,
  HiOutlineUser,
} from "react-icons/hi2";

import { TEAM_MEMBERS } from "@/shared/constants/teamMembers";
import { Task } from "../types/task";
import TaskPriorityBadge from "./TaskPriorityBadge";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

function formatDate(iso: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function findAssignee(id: string | null) {
  if (!id) return null;
  return TEAM_MEMBERS.find((m) => m.id === id) ?? null;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const assignee = findAssignee(task.assigneeId);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-bold text-gray-900">{task.title}</h4>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Edit task"
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition"
          >
            <HiOutlinePencil size={16} />
          </button>

          <button
            type="button"
            aria-label="Hapus task"
            onClick={() => onDelete(task)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition"
          >
            <HiOutlineTrash size={16} />
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-600 mb-3">{task.description}</p>

      <div className="flex items-center gap-2 mb-3">
        <TaskPriorityBadge priority={task.priority} />

        {assignee && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-700">
            <HiOutlineUser size={14} />
            {assignee.name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-700 mb-2">
        <HiOutlineCalendar size={14} />
        <span>{formatDate(task.deadline)}</span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-black"
          style={{ width: `${task.progress}%` }}
        />
      </div>
    </div>
  );
}
