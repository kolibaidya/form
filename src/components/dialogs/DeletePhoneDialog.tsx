import type { AsyncDialogProps } from "react-dialog-async";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDeletePhone } from "@/hooks/phoneHooks";

interface DeletePhoneDialogProps {
  _id: string;
}

export const DeletePhoneDialog = ({
  isOpen,
  handleClose,
  data,
}: AsyncDialogProps<DeletePhoneDialogProps, boolean>) => {
  const deletePhoneMutation = useDeletePhone();

  const handleDelete = () => {
    deletePhoneMutation.mutate(data._id, {
      onSuccess: () => {
        handleClose(true);
      },
      onError: (error) => {
        console.error("Delete failed", error);
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose(false);
      }}
    >
      <DialogContent className="w-[90vw] sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Delete Phone
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this phone?
        </p>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
            disabled={deletePhoneMutation.isPending}
          >
            Delete Phone
            {deletePhoneMutation.isPending ? "Deleting..." : "Delete phone"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
