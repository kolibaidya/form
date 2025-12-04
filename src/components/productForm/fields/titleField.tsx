import type { TitleFieldProps } from "@/components/types/titleFieldProps";

export const TitleField = ({ register, error }: TitleFieldProps) => (
  <div className="flex flex-col">
    <label className="font-medium">Title</label>
    <input
      {...register("title")}
      placeholder="Enter product title"
      className="border rounded p-2"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
