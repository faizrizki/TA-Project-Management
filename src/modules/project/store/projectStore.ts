import { create } from "zustand";

import { Project, ProjectPayload } from "../types/project";

interface ProjectState {
  projects: Project[];
  addProject: (data: ProjectPayload) => void;
  updateProject: (id: string, data: ProjectPayload) => void;
  deleteProject: (id: string) => void;
}

const initialProjects: Project[] = [
  {
    id: "p-1",
    name: "Website Redesign",
    description: "Redesign perusahaan website dengan UI/UX modern",
    status: "AKTIF",
    startDate: "2026-01-11",
    endDate: "2027-03-01",
    progress: 60,
    members: 1,
  },
];

export const useProjectStore = create<ProjectState>((set) => ({
  projects: initialProjects,

  addProject: (data) =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          id: `p-${Date.now()}`,
          ...data,
          progress: 0,
          members: 1,
        },
      ],
    })),

  updateProject: (id, data) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),
}));
