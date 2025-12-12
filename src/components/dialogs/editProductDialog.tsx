import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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

interface EditProductDialogProps {
  id: string;
  product: ProductSchemaType;
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
      name: editProductDialogData.product.name,
      title: editProductDialogData.product.title,
      price: editProductDialogData.product.price,
      category: editProductDialogData.product.category,
      description: editProductDialogData.product.description,
      root: null,
    },
  });

  const { mutateAsync, isPending } = useEditProduct(setError);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => !isOpen && handleClose(false)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log("Data from react-hook-form handleSubmit:", data);
            await mutateAsync({ id: editProductDialogData.id, data });
          })}
        >
          <Input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="m-2"
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
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
            type="text"
            placeholder="Price"
            {...register("price")}
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
          <Input
            type="text"
            placeholder="Description"
            {...register("description")}
            className="m-2"
          />
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
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
