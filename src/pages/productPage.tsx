import ErrorDisplay from "@/components/ErrorDisplay";
import LoadingDisplay from "@/components/LoadingDisplay";
import ProductFeed from "@/components/feed/productFeed";
import { useFetchProducts } from "@/hooks/userFetchProducts";

export default function ProductPage() {
  const { data: products, isFetching, error } = useFetchProducts();

  return (
    <div>
      <h1>products page</h1>
      {isFetching && <LoadingDisplay />}
      {error && <ErrorDisplay />}
      {products && <ProductFeed products={products} />}
    </div>
  );
}
