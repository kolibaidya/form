import type { UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "./productFormValues";

export type CategoryFieldProps = {
  register: UseFormRegister<ProductFormValues>;
  error?: string;
};
