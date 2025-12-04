import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().min(1, "Description is required"),
});

export type productSchemaType = z.infer<typeof productSchema>;
