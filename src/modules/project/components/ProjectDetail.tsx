"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { HiOutlineArrowLeft } from "react-icons/hi2";

import Button from "@/shared/components/Button";

import { useProjectStore } from "../store/projectStore";
import ProjectStatusBadge from "./ProjectStatusBadge";

import { useTaskStore } from "@/modules/task/store/taskStore";
import { Task, TaskStatus } from "@/modules/task/types/task";
import { TaskSchemaType } from "@/modules/task/validation/taskSchema";

import TaskCard from "@/modules/task/components/TaskCard";
import TaskFormModal from "@/modules/task/components/TaskFormModal";
import DeleteTaskModal from "@/modules/task/components/DeleteTaskModal";
import TaskStatusTabs from "@/modules/task/components/TaskStatusTabs";

import CommentList from "@/modules/comment/components/CommentList";

import { recordEvent } from "@/modules/activity/utils/recordEvent";

interface ProjectDetailProps {
  projectId: string;
}

type Mode = "create" | "edit";

function emptyCounts(): Record<TaskStatus, number> {
  return { TODO: 0, IN_PROGRESS: 0, REVIEW: 0, DONE: 0 };
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const project = useProjectStore((s) =>
    s.projects.find((p) => p.id === projectId)
  );

  const allTasks = useTaskStore((s) => s.tasks);
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const projectTasks = useMemo(
    () => allTasks.filter((t) => t.projectId === projectId),
    [allTasks, projectId]
  );

  const counts = useMemo(() => {
    const c = emptyCounts();
    projectTasks.forEach((t) => {
      c[t.status]++;
    });
    return c;
  }, [projectTasks]);

  const totalTask = projectTasks.length;
  const doneTask = counts.DONE;

  const [activeStatus, setActiveStatus] = useState<TaskStatus>("TODO");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<Mode>("create");
  const [editing, setEditing] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  if (!project) {
    return (
      <div className="text-gray-700">
        Proyek tidak ditemukan.{" "}
        <Link href="/proyek" className="text-[#F25C66] font-semibold underline">
          Kembali ke daftar proyek
        </Link>
      </div>
    );
  }

  const filteredTasks = projectTasks.filter((t) => t.status === activeStatus);

  const openCreate = () => {
    setFormMode("create");
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (task: Task) => {
    setFormMode("edit");
    setEditing(task);
    setFormOpen(true);
  };

  const handleSubmit = async (data: TaskSchemaType) => {
    // ============================================================
    // TODO: Aktifkan saat backend siap
    // ------------------------------------------------------------
    // CREATE → POST http://localhost:8000/api/projects/{projectId}/tasks
    // UPDATE → PUT  http://localhost:8000/api/tasks/{taskId}
    // Body:    { title, description, status, priority, progress,
    //            deadline, assigneeId }
    // Success (200/201):
    //   { success: true, data: { id, projectId, title, description,
    //     status, priority, progress, deadline, assigneeId } }
    // ------------------------------------------------------------
    // import { createTask, updateTask as updateTaskApi }
    //   from "@/modules/task/services/taskServices";
    // try {
    //   if (formMode === "edit" && editing) {
    //     await updateTaskApi(editing.id, data);
    //   } else {
    //     await createTask(projectId, data);
    //   }
    // } catch (err: any) { alert(err.response?.data?.message); }
    // ============================================================

    // ===== DUMMY (hapus saat API siap) =====
    if (formMode === "edit" && editing) {
      updateTask(editing.id, data);
      recordEvent({
        message: `mengubah task '${data.title}'`,
      });
    } else {
      addTask(projectId, data);
      recordEvent({
        message: `menambahkan task '${data.title}'`,
        notify: {
          title: "Task baru ditambahkan",
          message: `Task '${data.title}' ditambahkan ke proyek ${project.name}`,
          kind: "TASK",
        },
      });
    }
    // ===== END DUMMY =====
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    // ============================================================
    // TODO: Aktifkan saat backend siap
    // ------------------------------------------------------------
    // DELETE http://localhost:8000/api/tasks/{taskId}
    // Success (204): No Content
    // ------------------------------------------------------------
    // import { deleteTask as deleteTaskApi } from "@/modules/task/services/taskServices";
    // try { await deleteTaskApi(deleteTarget.id); }
    // catch (err: any) { alert(err.response?.data?.message); }
    // ============================================================

    // ===== DUMMY (hapus saat API siap) =====
    const title = deleteTarget.title;
    deleteTask(deleteTarget.id);
    recordEvent({
      message: `menghapus task '${title}'`,
    });
    // ===== END DUMMY =====
  };

  return (
    <div>
      <div className="flex items-start gap-3 mb-6">
        <Link
          href="/proyek"
          aria-label="Kembali"
          className="p-2 rounded-full hover:bg-gray-100 transition mt-1"
        >
          <HiOutlineArrowLeft size={22} />
        </Link>

        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
            <ProjectStatusBadge status={project.status} />
          </div>
          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#F6F6F6] rounded-[20px] p-7 shadow-[5px_6px_6.9px_rgba(0,0,0,0.12)]">
          <h3 className="font-bold text-gray-900 mb-3">Progress Keseluruhan</h3>
          <p className="text-2xl font-bold text-gray-900 mb-2">
            {project.progress}%
          </p>
          <div className="w-full h-2 rounded-full bg-gray-300 overflow-hidden">
            <div
              className="h-full bg-black"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="bg-[#F6F6F6] rounded-[20px] p-7 shadow-[5px_6px_6.9px_rgba(0,0,0,0.12)]">
          <h3 className="font-bold text-gray-900 mb-3">Total Task</h3>
          <p className="text-2xl font-bold text-gray-900">{totalTask}</p>
          <p className="text-xs text-gray-600 mt-1">{doneTask} Selesai</p>
        </div>

        <div className="bg-[#F6F6F6] rounded-[20px] p-7 shadow-[5px_6px_6.9px_rgba(0,0,0,0.12)]">
          <h3 className="font-bold text-gray-900 mb-3">Anggota Tim</h3>
          <p className="text-2xl font-bold text-gray-900">{project.members}</p>
          <p className="text-xs text-gray-600 mt-1">Kelola Tim</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Daftar Task</h2>

        <Button
          text="Tambah Task"
          variant="dark"
          fullWidth={false}
          onClick={openCreate}
        />
      </div>

      <div className="mb-5">
        <TaskStatusTabs
          active={activeStatus}
          counts={counts}
          onChange={setActiveStatus}
        />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="bg-[#F6F6F6] rounded-[20px] p-8 text-center text-gray-500">
          Tidak ada task pada status ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <TaskFormModal
        open={formOpen}
        mode={formMode}
        initialData={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <DeleteTaskModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <div className="mt-10">
        <CommentList projectId={projectId} />
      </div>
    </div>
  );
}
