import {
  ProjectStatus,
  PROJECT_STATUS_LABEL,
} from "../types/project";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

const STATUS_CLASS: Record<ProjectStatus, string> = {
  AKTIF: "bg-[#7DD957] text-white",
  DITUNDA: "bg-[#E8DC6D] text-gray-900",
  SELESAI: "bg-gray-300 text-gray-900",
};

export default function ProjectStatusBadge({
  status,
}: ProjectStatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-4 py-1
        rounded-full
        text-sm font-semibold
        ${STATUS_CLASS[status]}
      `}
    >
      {PROJECT_STATUS_LABEL[status]}
    </span>
  );
}
