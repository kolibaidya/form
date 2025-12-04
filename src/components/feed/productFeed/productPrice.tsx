import type { productPriceProps } from "../feedTypes.ts/productPriceProps";

export const ProductPrice = ({ price }: productPriceProps) => (
  <p className="font-medium">${price}</p>
);
