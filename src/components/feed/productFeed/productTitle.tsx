import type { productTitleProps } from "@/components/feed/feedTypes.ts/productTitleProps";

export const ProductTitle = ({ title }: productTitleProps) => (
  <h2 className="font-bold text-lg">{title}</h2>
);
