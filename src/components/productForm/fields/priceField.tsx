import type { PriceFieldProps } from "@/components/types/priceFieldProps";

export const PriceField = ({ register, error }: PriceFieldProps) => (
  <div className="flex flex-col">
    <label className="font-medium">Price</label>
    <input
      type="number"
      {...register("price", { valueAsNumber: true })}
      placeholder="Enter price"
      className="border rounded p-2"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
