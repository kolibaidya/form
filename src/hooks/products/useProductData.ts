import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "@/services/fetchProducts";
import { deleteProduct } from "@/services/deleteProduct";
import { ProductDialog } from "@/components/productDialog/productDialog";
import type { Product } from "@/components/types/product";

export const useProductData = () => {
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const openProductDialog = async (product?: Product) => {
    try {
      const result = await ProductDialog(product);
      if (result) {
        console.log("Saved product:", result);
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    } catch {
      console.log("Dialog closed without action");
    }
  };

  const handleDelete = (product: Product) => {
    const index = products.indexOf(product);
    if (index >= 0) deleteMutation.mutate(index);
  };

  return { products, isLoading, isError, openProductDialog, handleDelete };
};
