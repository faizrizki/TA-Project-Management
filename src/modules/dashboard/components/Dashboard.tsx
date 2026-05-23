"use client";

import { useMemo } from "react";

import {
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineUsers,
  HiOutlinePrinter,
} from "react-icons/hi2";

import { useAuthStore } from "@/modules/auth/store/authStore";
import { useProjectStore } from "@/modules/project/store/projectStore";
import { useTaskStore } from "@/modules/task/store/taskStore";

import Button from "@/shared/components/Button";

import { calcStats, calcTaskStatusCounts, takeRecent } from "../utils/stats";

import StatCard from "./StatCard";
import ProgressBarChart from "./ProgressBarChart";
import TaskStatusDonut from "./TaskStatusDonut";
import RecentProjectItem from "./RecentProjectItem";

import ActivityLog from "@/modules/activity/components/ActivityLog";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const projects = useProjectStore((s) => s.projects);
  const tasks = useTaskStore((s) => s.tasks);

  const stats = useMemo(() => calcStats(projects, tasks), [projects, tasks]);
  const taskCounts = useMemo(() => calcTaskStatusCounts(tasks), [tasks]);
  const recentForChart = useMemo(() => takeRecent(projects, 5), [projects]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8 print:mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Selamat datang, {user?.name ?? "User"}!
          </p>
        </div>

        <div className="print:hidden">
          <Button
            text="Cetak Laporan"
            variant="dark"
            fullWidth={false}
            icon={<HiOutlinePrinter size={18} />}
            onClick={handlePrint}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StatCard
          title="Proyek Aktif"
          value={stats.activeProjects}
          hint={`dari ${stats.totalProjects} total proyek`}
          icon={<HiOutlineClock size={22} />}
        />
        <StatCard
          title="Proyek Selesai"
          value={stats.completedProjects}
          hint="Proyek selesai"
          icon={<HiOutlineCheckCircle size={22} />}
        />
        <StatCard
          title="Total Task"
          value={stats.totalTasks}
          hint={`${stats.doneTasks} selesai`}
          icon={<HiOutlineExclamationCircle size={22} />}
        />
        <StatCard
          title="Tingkat Penyelesaian"
          value={`${stats.completionRate}%`}
          hint="dari semua task"
          icon={<HiOutlineUsers size={22} />}
        />
      </div>

      <section className="bg-[#F6F6F6] rounded-[20px] p-7 mb-6">
        <h2 className="font-bold text-gray-900">Progress Proyek</h2>
        <p className="text-xs text-gray-600 mb-4">
          {recentForChart.length} Proyek Terbaru
        </p>

        <ProgressBarChart projects={recentForChart} />
      </section>

      <section className="bg-[#F6F6F6] rounded-[20px] p-7 mb-6">
        <h2 className="font-bold text-gray-900">Status Task</h2>
        <p className="text-xs text-gray-600 mb-4">
          Distribusi berdasarkan status
        </p>

        <TaskStatusDonut counts={taskCounts} />
      </section>

      <section className="bg-[#F6F6F6] rounded-[20px] p-7">
        <h2 className="font-bold text-gray-900">Proyek Terbaru</h2>
        <p className="text-xs text-gray-600 mb-4">
          Daftar proyek yang baru saja dibuat atau diperbarui
        </p>

        {projects.length === 0 ? (
          <p className="text-sm text-gray-500 py-6 text-center">
            Belum ada proyek.
          </p>
        ) : (
          <div className="space-y-3">
            {takeRecent(projects, 3).map((p) => (
              <RecentProjectItem key={p.id} project={p} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#F6F6F6] rounded-[20px] p-7 mt-6">
        <h2 className="font-bold text-gray-900">Riwayat Aktivitas</h2>
        <p className="text-xs text-gray-600 mb-4">
          Aktivitas terbaru pengguna pada sistem
        </p>

        <ActivityLog limit={10} />
      </section>
    </div>
  );
}
