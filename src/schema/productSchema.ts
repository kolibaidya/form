import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name must be at least 10 characters"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at least 50 characters"),
  price: z
    .number()
    .min(2, "Price must be at least 2 characters")
    .max(20, "Price must be at least 20 characters"),
  category: z
    .string()
    .min(2, "Category must be at least 2 characters")
    .max(20, "category must be at least 20 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(100, "description must be at least 100 characters"),
  root: z.string().nullable(),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
