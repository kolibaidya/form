import { ProductName } from "@/components/feed/productFeed/productName";
import { ProductTitle } from "@/components/feed/productFeed/productTitle";
import { ProductPrice } from "@/components/feed/productFeed/productPrice";
import { ProductCategory } from "@/components/feed/productFeed/productCategory";
import { ProductDescription } from "@/components/feed/productFeed/productDescription";
import { ProductActions } from "@/components/feed/productFeed/productActions";
import type { productItemProps } from "../feedTypes.ts/productItemProps";

export const ProductItem = ({
  product,
  onEdit,
  onDelete,
}: productItemProps) => {
  return (
    <div className="border rounded p-4 flex flex-col gap-2 shadow hover:shadow-md transition">
      <ProductName name={product.name} />
      <ProductTitle title={product.title} />
      <ProductDescription description={product.description} />
      <ProductPrice price={product.price} />
      <ProductCategory category={product.category} />
      <ProductActions product={product} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};
