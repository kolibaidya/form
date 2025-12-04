import { Button } from "@/components/ui/button";
import type { EditButtonProps } from "./buttonType.ts/editButton";

export const EditButton = ({ product, onEdit }: EditButtonProps) => {
  const handleClick = () => {
    if (onEdit) onEdit(product);
  };

  return (
    <Button size="sm" variant="outline" onClick={handleClick}>
      Edit
    </Button>
  );
};
