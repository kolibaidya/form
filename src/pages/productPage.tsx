import { useSearchParams } from "react-router-dom";
import { ProductHeader } from "@/components/productPage/productHeader";
import { ProductList } from "@/components/productPage/productList";
import { ProductPagination } from "@/components/productPage/productPagination";
import { useProductData } from "@/hooks/products/useProductData";

const PAGE_SIZE = 3;

export default function ProductPage() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);

  const { products, isLoading, isError, openProductDialog, handleDelete } =
    useProductData();

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div className="text-red-500">Failed to load products.</div>;

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  if (page < 1 || page > totalPages) {
    setParams({ page: "1" });
    return null;
  }

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentProducts = products.slice(start, end);

  return (
    <div className="space-y-4 p-4">
      <ProductHeader onAdd={() => openProductDialog()} />
      <ProductList
        products={currentProducts}
        onEdit={openProductDialog}
        onDelete={handleDelete}
      />
      <ProductPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setParams({ page: String(p) })}
      />
    </div>
  );
}
