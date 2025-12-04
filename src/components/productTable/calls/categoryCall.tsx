import type { Product } from "@/components/types/product";

type Props = { product: Product };

export const CategoryCall = ({ product }: Props) => {
  return (
    <td className="px-4 py-2 text-sm text-gray-500">{product.category}</td>
  );
};
