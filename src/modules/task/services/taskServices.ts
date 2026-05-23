import api from "@/lib/axios";
import { TaskPayload } from "../types/task";

export const fetchTasks = async (projectId: string) => {
  return await api.get(`/projects/${projectId}/tasks`);
};

export const createTask = async (
  projectId: string,
  data: TaskPayload
) => {
  return await api.post(`/projects/${projectId}/tasks`, data);
};

export const updateTask = async (
  taskId: string,
  data: TaskPayload
) => {
  return await api.put(`/tasks/${taskId}`, data);
};

export const deleteTask = async (taskId: string) => {
  return await api.delete(`/tasks/${taskId}`);
};
