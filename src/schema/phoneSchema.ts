import { z } from "zod";

export const phoneSchema = z.object({
  Brand: z
    .string()
    .min(2, "Brand must be at least 2 characters")
    .max(20, "Brand must be at most 20 characters"),
  Name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be at most 20 characters"),
  ReleaseDate: z
    .string()
    .min(4, "Release date must be at least 4 characters")
    .max(10, "Release date must be at most 10 characters"),
  root: z.string().nullable(),
});

export type PhoneSchemaType = z.infer<typeof phoneSchema>;
