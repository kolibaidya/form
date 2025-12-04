import React from "react";
import { SearchInput } from "./searchInput";
import { CategorySelect } from "./categorySelect";
import { PriceRangeSlider } from "./priceRangeSlider";
import type { ProductFiltersProps } from "../types/productFilterProps";

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  minPrice,
  maxPrice,
  filters,
  onFiltersChange,
}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-3 mb-4">
      <SearchInput
        value={filters.search}
        onChange={(value) => onFiltersChange({ ...filters, search: value })}
      />
      <CategorySelect
        categories={categories}
        selected={filters.category}
        onChange={(value) => onFiltersChange({ ...filters, category: value })}
      />
      <PriceRangeSlider
        min={minPrice}
        max={maxPrice}
        value={filters.priceRange}
        onChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
      />
    </div>
  );
};
