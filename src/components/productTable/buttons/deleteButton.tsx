import { Button } from "@/components/ui/button";
import type { DeleteButtonProps } from "./buttonType.ts/deleteButton";

export const DeleteButton = ({ product, onDelete }: DeleteButtonProps) => {
  const handleClick = () => {
    if (onDelete) onDelete(product);
  };

  return (
    <Button size="sm" variant="destructive" onClick={handleClick}>
      Delete
    </Button>
  );
};
