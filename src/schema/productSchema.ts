import { z } from "zod";

export const ProductSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(80, "Title must be at most 80 characters"),

  price: z.number().min(0.01, "Price must be greater than 0"),
  category: z
    .string()
    .min(2, "Category must be at least 2 characters")
    .max(20, "Category must be at most 20 characters"),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
