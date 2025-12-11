import { DialogDemo } from "@/components/dialogDemo";
import ErrorDisplay from "@/components/ErrorDisplay";
import ProductFeed from "@/components/feed/productFeed";
import LoadingDisplay from "@/components/LoadingDisplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchProducts } from "@/hooks/productPageHooks.";

export default function ProductPage() {
  const { isLoading, data: products, error } = useFetchProducts();

  return (
    <div>
      <DialogDemo />
      {isLoading && <LoadingDisplay />}
      {error && <ErrorDisplay error={error} />}
      {products && (
        <Card>
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
}
