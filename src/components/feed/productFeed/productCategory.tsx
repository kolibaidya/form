import type { productCategoryProps } from "../feedTypes.ts/productCategoryProps";

export const ProductCategory = ({ category }: productCategoryProps) => (
  <p className="text-sm text-gray-500">{category}</p>
);
