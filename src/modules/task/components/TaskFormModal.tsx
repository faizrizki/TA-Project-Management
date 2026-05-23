"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/shared/components/Modal";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import Button from "@/shared/components/Button";

import { TEAM_MEMBERS } from "@/shared/constants/teamMembers";

import {
  taskSchema,
  TaskSchemaType,
} from "../validation/taskSchema";
import {
  Task,
  TASK_STATUS_LABEL,
  TASK_STATUS_ORDER,
  TASK_PRIORITY_LABEL,
} from "../types/task";

type Mode = "create" | "edit";

interface TaskFormModalProps {
  open: boolean;
  mode: Mode;
  initialData?: Task | null;
  onClose: () => void;
  onSubmit: (data: TaskSchemaType) => void;
}

const STATUS_OPTIONS = TASK_STATUS_ORDER.map((s) => ({
  value: s,
  label: TASK_STATUS_LABEL[s],
}));

const PRIORITY_OPTIONS = (
  Object.keys(TASK_PRIORITY_LABEL) as Array<keyof typeof TASK_PRIORITY_LABEL>
).map((key) => ({
  value: key,
  label: TASK_PRIORITY_LABEL[key],
}));

const ASSIGNEE_OPTIONS = [
  { value: "", label: "Belum ditentukan" },
  ...TEAM_MEMBERS.map((m) => ({ value: m.id, label: m.name })),
];

const TEXT: Record<Mode, { title: string; subtitle: string; submit: string }> = {
  create: {
    title: "Tambah Task Baru",
    subtitle: "Buat Task baru untuk Proyek ini",
    submit: "Tambah Task",
  },
  edit: {
    title: "Edit Task",
    subtitle: "Perbarui informasi Task",
    submit: "Simpan Perubahan",
  },
};

const DEFAULT_VALUES: TaskSchemaType = {
  title: "",
  description: "",
  status: "TODO",
  priority: "MEDIUM",
  progress: 0,
  deadline: "",
  assigneeId: null,
};

export default function TaskFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        priority: initialData.priority,
        progress: initialData.progress,
        deadline: initialData.deadline,
        assigneeId: initialData.assigneeId,
      });
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [open, mode, initialData, reset]);

  const submit = (data: TaskSchemaType) => {
    onSubmit({
      ...data,
      assigneeId: data.assigneeId === "" ? null : data.assigneeId,
    });
    onClose();
  };

  const text = TEXT[mode];

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-3xl font-bold text-gray-900">{text.title}</h2>
      <p className="text-gray-500 mt-1 mb-6">{text.subtitle}</p>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <div>
          <Input label="Judul Task" {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            {...register("status")}
          />

          <Select
            label="Prioritas"
            options={PRIORITY_OPTIONS}
            {...register("priority")}
          />

          <div>
            <Input
              label="Progress (%)"
              type="number"
              min={0}
              max={100}
              {...register("progress")}
            />
            {errors.progress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.progress.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Tanggal Deadline"
              type="date"
              {...register("deadline")}
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deadline.message}
              </p>
            )}
          </div>

          <Select
            label="Penanggung Jawab"
            options={ASSIGNEE_OPTIONS}
            {...register("assigneeId")}
          />
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
