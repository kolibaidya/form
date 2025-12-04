import type { UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "./productFormValues";

export type DescriptionFieldProps = {
  register: UseFormRegister<ProductFormValues>;
  error?: string;
};
