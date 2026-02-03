import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateProducts } from "@/hooks/productHooks";
import { ProductSchema, type ProductSchemaType } from "@/schema/productSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brain } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const CreateProductDialog = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      price: 0.01,
      category: "",
    },
  });

  const { mutateAsync, isPending } = useCreateProducts(setError, setOpen);
  const onSubmit = async (data: ProductSchemaType) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Create a new Product
          <Brain className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Create New Product
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full"
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          <Input
            type="number"
            step="any"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
            className="w-full"
          />
          <ErrorMessage
            errors={errors}
            name="price"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          <Input
            type="text"
            placeholder="Category"
            {...register("category")}
            className="w-full"
          />
          <ErrorMessage
            errors={errors}
            name="category"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto cursor-pointer"
            >
              {isPending ? "Creating..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
