"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/shared/components/Modal";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Button from "@/shared/components/Button";

import { ROLE_LABEL, Role } from "@/modules/auth/types/auth";

import { AppUser, UserPayload } from "../types/user";
import {
  userCreateSchema,
  userEditSchema,
  UserCreateSchemaType,
  UserEditSchemaType,
} from "../validation/userSchema";

type Mode = "create" | "edit";

interface UserFormModalProps {
  open: boolean;
  mode: Mode;
  initialData?: AppUser | null;
  onClose: () => void;
  onSubmit: (data: UserPayload | Partial<UserPayload>) => void;
}

const ROLE_OPTIONS = (Object.keys(ROLE_LABEL) as Role[]).map((r) => ({
  value: r,
  label: ROLE_LABEL[r],
}));

const TEXT: Record<Mode, { title: string; subtitle: string; submit: string }> = {
  create: {
    title: "Tambah User Baru",
    subtitle: "Tambahkan user baru ke sistem",
    submit: "Tambah User",
  },
  edit: {
    title: "Edit User",
    subtitle: "Perbarui informasi user",
    submit: "Simpan Perubahan",
  },
};

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  role: "TEAM_MEMBER" as Role,
};

export default function UserFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const schema = mode === "create" ? userCreateSchema : userEditSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserCreateSchemaType | UserEditSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        password: "",
        role: initialData.role,
      });
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [open, mode, initialData, reset]);

  const submit = (data: UserCreateSchemaType | UserEditSchemaType) => {
    if (mode === "edit" && data.password === "") {
      const { password: _omit, ...rest } = data;
      onSubmit(rest);
    } else {
      onSubmit(data as UserPayload);
    }
    onClose();
  };

  const text = TEXT[mode];

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-3xl font-bold text-gray-900">{text.title}</h2>
      <p className="text-gray-500 mt-1 mb-6">{text.subtitle}</p>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <div>
          <Input label="Nama" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input label="Email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            label={
              mode === "edit"
                ? "Password (kosongkan jika tidak diubah)"
                : "Password"
            }
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Select label="Role" options={ROLE_OPTIONS} {...register("role")} />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            text="Batal"
            variant="secondary"
            fullWidth={false}
            onClick={onClose}
          />

          <Button
            type="submit"
            text={text.submit}
            variant="dark"
            fullWidth={false}
          />
        </div>
      </form>
    </Modal>
  );
}
