"use client";

import { useState } from "react";

import { HiOutlinePlus } from "react-icons/hi2";

import Button from "@/shared/components/Button";

import { useProjectStore } from "../store/projectStore";
import { Project } from "../types/project";
import { ProjectSchemaType } from "../validation/projectSchema";

import { recordEvent } from "@/modules/activity/utils/recordEvent";

import ProjectCard from "./ProjectCard";
import ProjectFormModal from "./ProjectFormModal";
import DeleteProjectModal from "./DeleteProjectModal";

type Mode = "create" | "edit";

export default function ProjectList() {
  const projects = useProjectStore((s) => s.projects);
  const addProject = useProjectStore((s) => s.addProject);
  const updateProject = useProjectStore((s) => s.updateProject);
  const deleteProject = useProjectStore((s) => s.deleteProject);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<Mode>("create");
  const [editing, setEditing] = useState<Project | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const openCreate = () => {
    setFormMode("create");
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (project: Project) => {
    setFormMode("edit");
    setEditing(project);
    setFormOpen(true);
  };

  const handleSubmit = async (data: ProjectSchemaType) => {
    // ============================================================
    // TODO: Aktifkan saat backend siap
    // ------------------------------------------------------------
    // CREATE → POST http://localhost:8000/api/projects
    // UPDATE → PUT  http://localhost:8000/api/projects/{id}
    // Body:    { name, description, status, startDate, endDate }
    // Success (200/201):
    //   { success: true, data: { id, name, description, status,
    //     startDate, endDate, progress, members } }
    // Error (422): { success: false, errors: { endDate: ["..."] } }
    // ------------------------------------------------------------
    // import { createProject, updateProject as updateProjectApi }
    //   from "../services/projectServices";
    // try {
    //   if (formMode === "edit" && editing) {
    //     await updateProjectApi(editing.id, data);
    //   } else {
    //     await createProject(data);
    //   }
    //   // refetch list dari API atau update store lokal
    // } catch (err: any) { alert(err.response?.data?.message ?? "Gagal"); }
    // ============================================================

    // ===== DUMMY (hapus saat API siap) =====
    if (formMode === "edit" && editing) {
      updateProject(editing.id, data);
      recordEvent({
        message: `mengubah proyek '${data.name}'`,
      });
    } else {
      addProject(data);
      recordEvent({
        message: `membuat proyek '${data.name}'`,
        notify: {
          title: "Proyek baru dibuat",
          message: `Proyek '${data.name}' telah ditambahkan`,
          kind: "PROJECT",
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
    // DELETE http://localhost:8000/api/projects/{id}
    // Success (204): No Content
    // Error (403):   { success: false, message: "Tidak punya akses" }
    // ------------------------------------------------------------
    // import { deleteProject as deleteProjectApi } from "../services/projectServices";
    // try {
    //   await deleteProjectApi(deleteTarget.id);
    //   // refetch list atau hapus dari store
    // } catch (err: any) { alert(err.response?.data?.message); }
    // ============================================================

    // ===== DUMMY (hapus saat API siap) =====
    const name = deleteTarget.name;
    deleteProject(deleteTarget.id);
    recordEvent({
      message: `menghapus proyek '${name}'`,
    });
    // ===== END DUMMY =====
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Proyek</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola semua proyek Anda</p>
        </div>

        <Button
          text="Buat Proyek Baru"
          variant="dark"
          fullWidth={false}
          icon={<HiOutlinePlus size={18} />}
          onClick={openCreate}
        />
      </div>

      {projects.length === 0 ? (
        <div className="bg-[#F6F6F6] rounded-[20px] p-10 text-center text-gray-500">
          Belum ada proyek. Klik &quot;Buat Proyek Baru&quot; untuk memulai.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <ProjectFormModal
        open={formOpen}
        mode={formMode}
        initialData={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <DeleteProjectModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
