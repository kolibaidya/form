import { useFetchProducts } from "@/hooks/productHooks";
import ErrorDisplay from "@/components/ErrorDisplay";
import LoadingDisplay from "@/components/LoadingDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { ProductFeed } from "@/components/feed/productFeed";
import { ProductTable } from "@/components/table/productTable";

export const ProductPage = () => {
  const { isLoading, data: products, error } = useFetchProducts();

  return (
    <div
      className="w-full px-6 md:px-10 py-8 md:py-12 bg-zinc-50 min-h-screen"
      aria-label="Products Page"
      role="region"
    >
      {isLoading && <LoadingDisplay />}
      {error && <ErrorDisplay error={error} />}
      {products && (
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight  text-zinc-900">
                Products
              </h1>
              <p className="text-base text-zinc-500 mt-2 max-w-xl">
                Manage and view your product catalog
              </p>
            </div>
          </div>
          <div className="block md:hidden">
            <ProductFeed products={products} />
          </div>
          <div className="hidden md:block">
            <Card className="rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
              <CardContent className="p-6">
                <ProductTable products={products} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
