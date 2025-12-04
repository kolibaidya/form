import { ProductTable } from "@/components/productTable/productTable";
import type { Product } from "@/components/types/product";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export const ProductList = ({ products, onEdit, onDelete }: Props) => (
  <ProductTable data={products} onEdit={onEdit} onDelete={onDelete} />
);
