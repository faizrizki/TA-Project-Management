import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["ADMIN", "PROJECT_MANAGER", "TEAM_MEMBER", "CLIENT"]),
});

export const userEditSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .refine((v) => v === "" || v.length >= 6, {
      message: "Password minimal 6 karakter (kosongkan jika tidak diubah)",
    }),
  role: z.enum(["ADMIN", "PROJECT_MANAGER", "TEAM_MEMBER", "CLIENT"]),
});

export type UserCreateSchemaType = z.infer<typeof userCreateSchema>;
export type UserEditSchemaType = z.infer<typeof userEditSchema>;
