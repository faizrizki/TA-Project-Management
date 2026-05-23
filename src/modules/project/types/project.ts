export type ProjectStatus = "AKTIF" | "DITUNDA" | "SELESAI";

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  AKTIF: "Aktif",
  DITUNDA: "Ditunda",
  SELESAI: "Selesai",
};

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  progress: number;
  members: number;
}

export interface ProjectPayload {
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
}
