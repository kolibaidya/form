import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEditProduct } from "@/hooks/productHooks";
import { ProductSchema, type ProductSchemaType } from "@/schema/productSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AsyncDialogProps } from "react-dialog-async";
import { useForm } from "react-hook-form";
import type { product } from "../models/product";

export interface EditProductDialogProps {
  id: number;
  product: product;
}

export function EditProductDialog({
  isOpen,
  handleClose,
  data: editProductDialogData,
}: AsyncDialogProps<EditProductDialogProps, boolean>) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: editProductDialogData.product.title,
      price: Number(editProductDialogData.product.price),
      category: editProductDialogData.product.category,
    },
  });

  const { mutateAsync, isPending } = useEditProduct(setError);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => !isOpen && handleClose(false)}
    >
      <DialogContent className="w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Edit Product
          </DialogTitle>
          <DialogDescription className="text-sm">
            Update the product inforation and save changes
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            await mutateAsync({ id: editProductDialogData.id, data });
          })}
          className="space-y-3"
        >
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
            step="0.01"
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
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? "Editing..." : " Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
