import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/fetchProducts";
import { ProductItem } from "@/components/feed/productFeed/productItem";
import { LoadingState } from "@/components/feed/states/loadingState";
import { ErrorState } from "@/components/feed/states/ErrorSates";
import { EmptyState } from "@/components/feed/states/emptyState";
import type { Product } from "@/components/types/product";

type ProductGridProps = {
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

export const ProductGrid = ({ onEdit, onDelete }: ProductGridProps) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={(error as Error)?.message} />;
  if (!products || products.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductItem
          key={index}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
