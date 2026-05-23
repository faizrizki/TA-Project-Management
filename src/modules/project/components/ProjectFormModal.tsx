"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/shared/components/Modal";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import Button from "@/shared/components/Button";

import {
  projectSchema,
  ProjectSchemaType,
} from "../validation/projectSchema";
import { Project, PROJECT_STATUS_LABEL } from "../types/project";

type Mode = "create" | "edit";

interface ProjectFormModalProps {
  open: boolean;
  mode: Mode;
  initialData?: Project | null;
  onClose: () => void;
  onSubmit: (data: ProjectSchemaType) => void;
}

const STATUS_OPTIONS = (
  Object.keys(PROJECT_STATUS_LABEL) as Array<keyof typeof PROJECT_STATUS_LABEL>
).map((key) => ({
  value: key,
  label: PROJECT_STATUS_LABEL[key],
}));

const TEXT: Record<Mode, { title: string; subtitle: string; submit: string }> = {
  create: {
    title: "Buat Proyek Baru",
    subtitle: "Tambahkan Proyek baru ke sistem",
    submit: "Buat",
  },
  edit: {
    title: "Edit Proyek",
    subtitle: "Perbarui informasi proyek",
    submit: "Simpan Perubahan",
  },
};

export default function ProjectFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: ProjectFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "AKTIF",
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        status: initialData.status,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
      });
    } else {
      reset({
        name: "",
        description: "",
        status: "AKTIF",
        startDate: "",
        endDate: "",
      });
    }
  }, [open, mode, initialData, reset]);

  const submit = (data: ProjectSchemaType) => {
    onSubmit(data);
    onClose();
  };

  const text = TEXT[mode];

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-3xl font-bold text-gray-900">{text.title}</h2>
      <p className="text-gray-500 mt-1 mb-6">{text.subtitle}</p>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <div>
          <Input label="Nama Proyek" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Textarea label="Deskripsi" {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            {...register("status")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Tanggal Mulai"
              type="date"
              {...register("startDate")}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Tanggal Selesai"
              type="date"
              {...register("endDate")}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>
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
