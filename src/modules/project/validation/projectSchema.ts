import { z } from "zod";

export const projectSchema = z
  .object({
    name: z.string().min(1, "Nama proyek wajib diisi"),

    description: z.string().min(1, "Deskripsi wajib diisi"),

    status: z.enum(["AKTIF", "DITUNDA", "SELESAI"]),

    startDate: z.string().min(1, "Tanggal mulai wajib diisi"),

    endDate: z.string().min(1, "Tanggal selesai wajib diisi"),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "Tanggal selesai harus setelah tanggal mulai",
    path: ["endDate"],
  });

export type ProjectSchemaType = z.infer<typeof projectSchema>;
