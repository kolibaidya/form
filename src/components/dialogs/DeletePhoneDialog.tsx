import type { AsyncDialogProps } from "react-dialog-async";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeletePhone } from "@/hooks/phoneHooks";

interface DeletePhoneDialogProps {
  _id: string;
}

export const DeletePhoneDialog = ({
  isOpen,
  handleClose,
  data,
}: AsyncDialogProps<DeletePhoneDialogProps, boolean>) => {
  const { isPending, mutate } = useDeletePhone();

  const handleDelete = () => {
    if (!data?._id) return;

    mutate(data._id, {
      onSuccess: () => handleClose(true),
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => !isOpen && handleClose(false)}
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
            variant="outline"
            onClick={() => handleClose(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Deleting..." : "Delete phone"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
