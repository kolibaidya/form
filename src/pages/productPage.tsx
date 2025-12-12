import { useFetchProducts } from "@/hooks/productHooks";
import ErrorDisplay from "@/components/ErrorDisplay";
import LoadingDisplay from "@/components/LoadingDisplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductFeed } from "@/components/feed/productFeed";

export const ProductPage = () => {
  const { isLoading, data: products, error } = useFetchProducts();

  return (
    <div>
      {isLoading && <LoadingDisplay />}
      {error && <ErrorDisplay error={error} />}
      {products && (
        <Card className="xl">
          <CardHeader>
            <CardTitle>Product page</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              sapiente commodi eum error quibusdam atque saepe soluta laborum
              adipisci voluptatem?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ProductFeed products={products} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
