import type { Product } from "@/components/types/product";

type Props = { product: Product };

export const DescriptionCall = ({ product }: Props) => {
  return (
    <td className="px-4 py-2 text-sm font-medium text-gray-700">
      {product.description}
    </td>
  );
};
