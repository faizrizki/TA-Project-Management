"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { HiOutlinePlus } from "react-icons/hi2";

import Button from "@/shared/components/Button";

import { useAuthStore } from "@/modules/auth/store/authStore";
import { recordEvent } from "@/modules/activity/utils/recordEvent";

import { useUserStore } from "../store/userStore";
import { AppUser, UserPayload } from "../types/user";

import UserCard from "./UserCard";
import UserFormModal from "./UserFormModal";
import DeleteUserModal from "./DeleteUserModal";

type Mode = "create" | "edit";

export default function UserList() {
  const router = useRouter();

  const currentUser = useAuthStore((s) => s.user);

  const users = useUserStore((s) => s.users);
  const addUser = useUserStore((s) => s.addUser);
  const updateUser = useUserStore((s) => s.updateUser);
  const deleteUser = useUserStore((s) => s.deleteUser);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<Mode>("create");
  const [editing, setEditing] = useState<AppUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AppUser | null>(null);

  useEffect(() => {
    if (currentUser && currentUser.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <p className="text-sm text-gray-500">
        Hanya admin yang dapat mengakses halaman ini.
      </p>
    );
  }

  const openCreate = () => {
    setFormMode("create");
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (user: AppUser) => {
    setFormMode("edit");
    setEditing(user);
    setFormOpen(true);
  };

  const handleSubmit = async (data: UserPayload | Partial<UserPayload>) => {
    // ============================================================
    // TODO: Aktifkan saat backend siap (Admin only)
    // ------------------------------------------------------------
    // CREATE → POST http://localhost:8000/api/users
    // UPDATE → PUT  http://localhost:8000/api/users/{id}
    // Body:    { name, email, password?, role }
    //   (password opsional saat edit — kosongkan jika tidak diubah)
    // Success (200/201):
    //   { success: true, data: { id, name, email, role } }
    // Error (403): { success: false, message: "Hanya admin..." }
    // Error (422): { success: false, errors: { email: ["sudah terdaftar"] } }
    // ------------------------------------------------------------
    // import { createUser, updateUser as updateUserApi }
    //   from "../services/userServices";
    // try {
    //   if (formMode === "edit" && editing) {
    //     await updateUserApi(editing.id, data);
    //   } else {
    //     await createUser(data as UserPayload);
    //   }
    // } catch (err: any) { alert(err.response?.data?.message); }
    // ============================================================

    // ===== DUMMY (hapus saat API siap) =====
    if (formMode === "edit" && editing) {
      updateUser(editing.id, data);
      recordEvent({ message: `mengubah user '${data.name ?? editing.name}'` });
    } else {
      addUser(data as UserPayload);
      recordEvent({
        message: `menambah user '${(data as UserPayload).name}'`,
        notify: {
          title: "User baru ditambahkan",
          message: `User '${(data as UserPayload).name}' bergabung dengan role ${(data as UserPayload).role}`,
          kind: "INFO",
        },
      });
    }
    // ===== END DUMMY =====
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    // ============================================================
    // TODO: Aktifkan saat backend siap (Admin only)
    // ------------------------------------------------------------
    // DELETE http://localhost:8000/api/users/{id}
    // Success (204): No Content
    // ------------------------------------------------------------
    // import { deleteUser as deleteUserApi } from "../services/userServices";
    // try { await deleteUserApi(deleteTarget.id); }
    // catch (err: any) { alert(err.response?.data?.message); }
    // ============================================================

    // ===== DUMMY (hapus saat API siap) =====
    const name = deleteTarget.name;
    deleteUser(deleteTarget.id);
    recordEvent({ message: `menghapus user '${name}'` });
    // ===== END DUMMY =====
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Pengguna</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola akun dan role pengguna
          </p>
        </div>

        <Button
          text="Tambah User"
          variant="dark"
          fullWidth={false}
          icon={<HiOutlinePlus size={18} />}
          onClick={openCreate}
        />
      </div>

      {users.length === 0 ? (
        <div className="bg-[#F6F6F6] rounded-[20px] p-10 text-center text-gray-500">
          Belum ada user.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              canDelete={u.id !== currentUser.id}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <UserFormModal
        open={formOpen}
        mode={formMode}
        initialData={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <DeleteUserModal
        open={deleteTarget !== null}
        userName={deleteTarget?.name}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
