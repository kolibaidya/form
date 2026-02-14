import { useFetchProducts } from "@/hooks/productHooks";
import ErrorDisplay from "@/components/ErrorDisplay";
import LoadingDisplay from "@/components/LoadingDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { ProductFeed } from "@/components/feed/productFeed";
import { ProductTable } from "@/components/table/productTable";

export const ProductPage = () => {
  const { isLoading, data: products, error } = useFetchProducts();

  return (
    <div className="w-full max-w-none" aria-label="Products Page" role="region">
      {isLoading && <LoadingDisplay />}
      {error && <ErrorDisplay error={error} />}
      {products && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
                Products
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                Manage and view your product catalog
              </p>
            </div>
          </div>
          <div className="block md:hidden">
            <ProductFeed products={products} />
          </div>
          <div className="hidden md:block">
            <Card className="border border-zinc-200 shadow-sm">
              <CardContent className="p-0">
                <ProductTable products={products} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
