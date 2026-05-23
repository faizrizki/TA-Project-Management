import { Project } from "@/modules/project/types/project";
import { Task, TaskStatus } from "@/modules/task/types/task";

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  doneTasks: number;
  completionRate: number;
}

export function calcStats(
  projects: Project[],
  tasks: Task[]
): DashboardStats {
  const activeProjects = projects.filter((p) => p.status === "AKTIF").length;
  const completedProjects = projects.filter((p) => p.status === "SELESAI")
    .length;
  const doneTasks = tasks.filter((t) => t.status === "DONE").length;

  const completionRate =
    tasks.length === 0 ? 0 : Math.round((doneTasks / tasks.length) * 100);

  return {
    totalProjects: projects.length,
    activeProjects,
    completedProjects,
    totalTasks: tasks.length,
    doneTasks,
    completionRate,
  };
}

export function calcTaskStatusCounts(
  tasks: Task[]
): Record<TaskStatus, number> {
  const counts: Record<TaskStatus, number> = {
    TODO: 0,
    IN_PROGRESS: 0,
    REVIEW: 0,
    DONE: 0,
  };

  tasks.forEach((t) => counts[t.status]++);
  return counts;
}

export function takeRecent<T extends { id: string }>(items: T[], n: number) {
  return items.slice(-n).reverse();
}
