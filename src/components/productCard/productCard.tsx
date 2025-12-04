import { TableActions } from "@/components/productTable/actions/tableActions";
import type { ProductCardProps } from "@/components/types/productCardProps";
import { NameText } from "./cardCall/nameText";
import { TitleText } from "./cardCall/titleText";
import { PriceText } from "./cardCall/priceText";
import { CategoryText } from "./cardCall/categoryText";
import { DescriptionText } from "./cardCall/descriptionText";

export const ProductCard = ({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) => {
  return (
    <div className="border rounded-xl p-5 shadow-sm hover:shadow-lg transition-all bg-white flex flex-col gap-2">
      <h3 className="font-bold text-lg text-gray-800">
        <NameText name={product.name} />
      </h3>
      <p className="text-gray-700">
        <TitleText title={product.title} />
      </p>
      <p className="text-gray-900 font-semibold">
        <PriceText price={product.price} />
      </p>
      <div className="text-sm text-gray-600">
        <CategoryText category={product.category} />
      </div>
      <p className="text-xs text-gray-500 leading-5 line-clamp-3">
        <DescriptionText description={product.description} />
      </p>
      <div className="mt-3 flex justify-end">
        <TableActions product={product} onEdit={onEdit} onDelete={onDelete} />
      </div>
        
    </div>
  );
};
