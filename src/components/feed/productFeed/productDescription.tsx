import type { productDescriptionProps } from "../feedTypes.ts/productDescriptionProps";

export const ProductDescription = ({
  description,
}: productDescriptionProps) => <p className="text-gray-600">{description}</p>;
