export const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.map((p: any) => ({
    title: p.title,
    name: p.title,
    price: p.price,
    category: p.category,
    description: p.description,
  }));
};
