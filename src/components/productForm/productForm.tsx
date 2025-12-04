import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ProductFormValues } from "@/components/types/productFormValues";
import { productSchema } from "@/schema/productSchema";

export function ProductForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 max-w-lg mx-auto"
    >
      <Input placeholder="Name" {...register("name")} />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <Input placeholder="Title" {...register("title")} />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <Input placeholder="Category" {...register("category")} />
      {errors.category && (
        <p className="text-red-500">{errors.category.message}</p>
      )}
      <Input placeholder="Price" type="number" {...register("price")} />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      <Input placeholder="Description" {...register("description")} />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
      <div className="flex justify-end gap-2">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
