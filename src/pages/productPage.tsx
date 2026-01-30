import { useFetchProducts } from "@/hooks/productHooks";
import ErrorDisplay from "@/components/ErrorDisplay";
import LoadingDisplay from "@/components/LoadingDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { ProductFeed } from "@/components/feed/productFeed";
import { ProductTable } from "@/components/table/productTable";

export const ProductPage = () => {
  const { isLoading, data: products, error } = useFetchProducts();

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      {isLoading && <LoadingDisplay />}
      {error && <ErrorDisplay error={error} />}
      {products && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Products Page
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage your products here.
              </p>
            </div>
          </div>
          <div className="block md:hidden">
            <ProductFeed products={products} />
          </div>
          <div className="hidden md:block">
            <Card className="w-full max-w-[1000px] mx-auto">
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
