import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  root: z.string().nullable(),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
