import type { AsyncDialogProps } from "react-dialog-async";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDeleteProduct } from "@/hooks/productHooks";

interface DeleteProductDialogProps {
  id: string;
}

export const DeleteProductDialog = ({
  isOpen,
  handleClose,
  data,
}: AsyncDialogProps<DeleteProductDialogProps, boolean>) => {
  const { mutateAsync } = useDeleteProduct();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => !isOpen && handleClose(false)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this product?</p>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={async () => {
              await mutateAsync(data.id);
              handleClose(true);
            }}
          >
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
