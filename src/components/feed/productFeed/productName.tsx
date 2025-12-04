import type { productNameProps } from "../feedTypes.ts/productNameProps";

export const ProductName = ({ name }: productNameProps) => (
  <h2 className="font-bold text-lg">{name}</h2>
);
