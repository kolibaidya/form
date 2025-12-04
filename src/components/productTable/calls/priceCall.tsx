import type { Product } from "@/components/types/product";

type Props = { product: Product };

export const PriceCall = ({ product }: Props) => {
  return (
    <td className="px-4 py-2 text-sm text-green-600 font-semibold">
      ${product.price}
    </td>
  );
};
