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
  id: number;
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
      <DialogContent className="w-[90vw] sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Delete Product
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this product?
        </p>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            variant="destructive"
            className="w-full"
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
