import { useQuery } from "@tanstack/react-query";

type product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductFeed() {
  const { data, isLoading, error } = useQuery<product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div>
      <h2>Product List</h2>

      {data?.map((product) => (
        <div key={product.id} style={{ marginBottom: "20px" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "150px" }}
          />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <h4>{product.description}</h4>
          <h2>{product.category}</h2>
        </div>
      ))}
    </div>
  );
}
