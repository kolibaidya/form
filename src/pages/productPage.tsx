import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductPage() {
  const queryClient = useQueryClient();

  // ⿡ Fetch product list
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      return res.json();
    },
  });

  // ⿢ Create product
  const createProduct = useMutation({
    mutationFn: async (newProduct: Omit<Product, "id">) => {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Products"] }); // refresh list
    },
  });

  // ⿣ Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Products"] });
    },
  });

  // Form state
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && price !== "") {
      createProduct.mutate({
        title: title,
        price: Number(price),
        description: "string",
        category: "string",
        image: "https://via.placeholder.com/150",
      });

      setTitle("");
      setPrice("");
    }
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* Create Product Form */}
      <form onSubmit={handleSubmit} className="flex gap-4 mb-10">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded w-24"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "150px" }}
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-md font-medium">${product.price}</p>
              <h4>{product.description}</h4>
              <h2>{product.category}</h2>
            </div>
            <button
              onClick={() => deleteProduct.mutate(product.id)}
              className="mt-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 self-start"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
