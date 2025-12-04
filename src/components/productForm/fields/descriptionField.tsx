import type { DescriptionFieldProps } from "@/components/types/descriptionFieldProps";

export const DescriptionField = ({
  register,
  error,
}: DescriptionFieldProps) => (
  <div className="flex flex-col">
    <label className="font-medium">Description</label>
    <textarea
      {...register("description")}
      placeholder="Enter description"
      className="border rounded p-2"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
