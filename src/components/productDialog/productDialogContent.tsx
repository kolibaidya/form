import { DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import type { Product } from "@/components/types/product";
import type { ProductFormValues } from "@/components/types/productFormValues";
import { ProductForm } from "../productForm/productForm";

type Props = {
  product?: Product;
  onSubmit: (values: ProductFormValues) => void;
  onClose: () => void;
};

export const ProductDialogContent = ({ product, onSubmit, onClose }: Props) => (
  <DialogContent className="sm:max-w-lg w-full">
    <ProductForm
      defaultValues={{
        name: product?.name ?? "",
        title: product?.title ?? "",
        price: product?.price ?? 0,
        category: product?.category ?? "",
        description: product?.description ?? "",
      }}
      onSubmit={onSubmit}
    />
    <div className="mt-4 flex justify-end">
      <Button onClick={onClose}>Cancel</Button>
    </div>
  </DialogContent>
);
