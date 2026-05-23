import Link from "next/link";

import { HiOutlinePencil, HiOutlineTrash, HiOutlineUsers } from "react-icons/hi2";

import { Project } from "../types/project";
import ProjectStatusBadge from "./ProjectStatusBadge";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
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

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="bg-[#F6F6F6] rounded-[20px] p-7 shadow-[5px_6px_6.9px_rgba(0,0,0,0.12)]">
      <div className="flex items-start justify-between gap-4 mb-3">
        <Link
          href={`/proyek/${project.id}`}
          className="text-xl font-bold text-gray-900 hover:underline"
        >
          {project.name}
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Edit proyek"
            onClick={() => onEdit(project)}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-700 transition"
          >
            <HiOutlinePencil size={18} />
          </button>

          <button
            type="button"
            aria-label="Hapus proyek"
            onClick={() => onDelete(project)}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-700 transition"
          >
            <HiOutlineTrash size={18} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4">{project.description}</p>

      <div className="flex items-center gap-4 mb-4">
        <ProjectStatusBadge status={project.status} />

        <div className="flex items-center gap-1 text-sm text-gray-700">
          <HiOutlineUsers size={16} />
          <span>{project.members} Anggota</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-700">Progress</span>
          <span className="font-semibold text-gray-900">{project.progress}%</span>
        </div>

        <div className="w-full h-2 rounded-full bg-gray-300 overflow-hidden">
          <div
            className="h-full bg-black"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="text-xs text-gray-700 space-y-0.5">
        <p>Mulai: {formatDate(project.startDate)}</p>
        <p>Selesai: {formatDate(project.endDate)}</p>
      </div>
    </div>
  );
}
