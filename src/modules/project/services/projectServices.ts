import api from "@/lib/axios";
import { ProjectPayload } from "../types/project";

export const fetchProjects = async () => {
  return await api.get("/projects");
};

export const createProject = async (data: ProjectPayload) => {
  return await api.post("/projects", data);
};

export const updateProject = async (id: string, data: ProjectPayload) => {
  return await api.put(`/projects/${id}`, data);
};

export const deleteProject = async (id: string) => {
  return await api.delete(`/projects/${id}`);
};
