import type { ProductFormValues } from "./productFormValues";

export type ProductFormProps = {
  defaultValues?: ProductFormValues;
  onSubmit?: (values: ProductFormValues) => void;
};
