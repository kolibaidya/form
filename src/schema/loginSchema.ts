import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(3, "Password is required"),
  root: z.string().nullable(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
