import { createRoot } from "react-dom/client";
import type { Product } from "@/components/types/product";

export const ProductDialog = (
  product?: Product
): Promise<Product | undefined> => {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleClose = () => {
      root.unmount();
      container.remove();
      reject("Dialog closed without action");
    };

    const handleSave = (data: Product) => {
      root.unmount();
      container.remove();
      resolve(data);
    };

    root.render(
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">
            {product ? "Edit" : "Add"} Product
          </h2>

          <input
            type="text"
            defaultValue={product?.name || ""}
            placeholder="Product Name"
            className="border p-2 w-full mb-2"
            id="productName"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() =>
                handleSave({
                  ...(product ?? {}),
                  name: (
                    document.getElementById("productName") as HTMLInputElement
                  ).value,
                } as Product)
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  });
};
