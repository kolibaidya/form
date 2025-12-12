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
      name: "",
      title: "",
      price: 0,
      category: "",
      description: "",
      root: null,
    },
  });

  const { mutateAsync, isPending } = useCreateProducts(setError, setOpen);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create a new Product
          <Brain />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log("Data from react-hook-form handleSubmit:", data);
            await mutateAsync(data);
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
              {isPending ? "Creating..." : " Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
