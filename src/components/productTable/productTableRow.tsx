import { CategoryText } from "../productCard/cardCall/categoryText";
import { DescriptionText } from "../productCard/cardCall/descriptionText";
import { NameText } from "../productCard/cardCall/nameText";
import { PriceText } from "../productCard/cardCall/priceText";
import { TitleText } from "../productCard/cardCall/titleText";
import type { ProductTableRowProps } from "../types/productTableRowProps";
import { TableActions } from "./actions/tableActions";

export const TableRow = ({
  product,
  onEdit,
  onDelete,
}: ProductTableRowProps) => (
  <tr>
    <NameText name={product.name} />
    <TitleText title={product.title} />
    <PriceText price={product.price} />
    <CategoryText category={product.category} />
    <DescriptionText description={product.description} />
    <TableActions product={product} onEdit={onEdit} onDelete={onDelete} />
  </tr>
);
