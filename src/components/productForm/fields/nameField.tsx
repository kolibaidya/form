import type { NameFieldProps } from "@/components/types/nameFieldProps";

export const NameField = ({ register, error }: NameFieldProps) => (
  <div className="flex flex-col">
    <label className="font-medium">Name</label>
    <input
      {...register("name")}
      placeholder="Enter product name"
      className="border rounded p-2"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
