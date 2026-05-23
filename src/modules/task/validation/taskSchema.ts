import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Judul task wajib diisi"),

  description: z.string().min(1, "Deskripsi wajib diisi"),

  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),

  progress: z.coerce
    .number()
    .min(0, "Progress minimal 0")
    .max(100, "Progress maksimal 100"),

  deadline: z.string().min(1, "Tanggal deadline wajib diisi"),

  assigneeId: z.string().nullable(),
});

export type TaskSchemaType = z.infer<typeof taskSchema>;
