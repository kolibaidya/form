export const deleteProduct = async (index: number) => {
  const res = await fetch(`https://fakestoreapi.com/products/${index}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete product");
  }
  return res.json();
};
