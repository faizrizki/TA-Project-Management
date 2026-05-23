import Link from "next/link";

import { Project } from "@/modules/project/types/project";
import ProjectStatusBadge from "@/modules/project/components/ProjectStatusBadge";

interface RecentProjectItemProps {
  project: Project;
}

export default function RecentProjectItem({ project }: RecentProjectItemProps) {
  return (
    <Link
      href={`/proyek/${project.id}`}
      className="block bg-white rounded-[20px] p-6 border border-gray-200 hover:border-gray-400 transition shadow-[5px_6px_6.9px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900">{project.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{project.description}</p>

          <div className="flex items-center gap-3 mt-3">
            <ProjectStatusBadge status={project.status} />
            <span className="text-xs text-gray-700">
              {project.members} Anggota
            </span>
          </div>
        </div>

        <div className="w-48 shrink-0">
          <p className="text-xs text-gray-700 mb-1">Progress</p>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-black"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-700 mt-1">{project.progress}%</p>
        </div>
      </div>
    </Link>
  );
}
