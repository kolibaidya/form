import type { UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "./productFormValues";

export type NameFieldProps = {
  register: UseFormRegister<ProductFormValues>;
  error?: string;
};
