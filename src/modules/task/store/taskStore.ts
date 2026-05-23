import { create } from "zustand";

import { Task, TaskPayload } from "../types/task";

interface TaskState {
  tasks: Task[];
  addTask: (projectId: string, data: TaskPayload) => void;
  updateTask: (taskId: string, data: TaskPayload) => void;
  deleteTask: (taskId: string) => void;
}

const initialTasks: Task[] = [
  {
    id: "t-1",
    projectId: "p-1",
    title: "Setup Analytics",
    description: "Integrasi Google Analytics dan Tracking Events",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    progress: 40,
    deadline: "2026-11-15",
    assigneeId: "u-1",
  },
  {
    id: "t-2",
    projectId: "p-1",
    title: "Design Homepage Mockup",
    description: "Buat Mockup Design untuk halaman utama Website",
    status: "DONE",
    priority: "HIGH",
    progress: 100,
    deadline: "2026-11-12",
    assigneeId: "u-2",
  },
];

export const useTaskStore = create<TaskState>((set) => ({
  tasks: initialTasks,

  addTask: (projectId, data) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: `t-${Date.now()}`,
          projectId,
          ...data,
        },
      ],
    })),

  updateTask: (taskId, data) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, ...data } : t
      ),
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    })),
}));
