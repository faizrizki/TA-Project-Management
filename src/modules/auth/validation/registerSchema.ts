import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .email("Email tidak valid"),

    password: z
      .string()
      .min(
        6,
        "Password minimal 6 karakter"
      ),

    confirmPassword: z.string(),
  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message: "Password tidak sama",
      path: ["confirmPassword"],
    }
  );

export type RegisterSchemaType =
  z.infer<typeof registerSchema>;