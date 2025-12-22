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
import { useEditProduct } from "@/features/products/hooks/productHooks";
import {
  ProductSchema,
  type ProductSchemaType,
} from "@/features/products/schema/productSchema";
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
  data,
}: AsyncDialogProps<EditProductDialogProps, boolean>) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: data.product.title,
      price: Number(data.product.price),
      category: data.product.category,
    },
  });

  const { mutate, isPending } = useEditProduct();

  const onSubmit = (FormData: ProductSchemaType) => {
    mutate(
      { id: data.id, data: FormData },
      {
        onSuccess: () => {
          handleClose(true);
        },
        onError: (error) => {
          setError("root", {
            type: "server",
            message: (error as Error).message,
          });
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(Open) => !Open && handleClose(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product inforation and save changes
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="m-2"
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
          <Input
            type="number"
            step="0.00"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
            className="m-2"
          />
          <ErrorMessage
            errors={errors}
            name="price"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
          <Input
            type="text"
            placeholder="Category"
            {...register("category")}
            className="m-2"
          />
          <ErrorMessage
            errors={errors}
            name="category"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Editing..." : " Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
