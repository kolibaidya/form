import type { CategoryFieldProps } from "@/components/types/categoryFieldProps";

export const CategoryField = ({ register, error }: CategoryFieldProps) => (
  <div className="flex flex-col">
    <label className="font-medium">Category</label>
    <input
      {...register("category")}
      placeholder="Enter category"
      className="border rounded p-2"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
