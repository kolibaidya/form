import type { ProductFilters as FiltersType } from "./productFilter";

export type ProductFiltersProps = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
};
