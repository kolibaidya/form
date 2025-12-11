import type { AsyncDialogProps } from "react-dialog-async";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useDeletePhone } from "@/hooks/phoneHooks";

interface DeletePhoneDialogProps {
  id: string;
}

export const DeletePhoneDialog = ({
  isOpen,
  handleClose,
  data,
}: AsyncDialogProps<DeletePhoneDialogProps, boolean>) => {
  const { mutateAsync } = useDeletePhone();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => !isOpen && handleClose(false)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Phone</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this phone?</p>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={async () => {
              await mutateAsync(data.id);
              handleClose(true);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
