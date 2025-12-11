import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEditPhone } from "@/hooks/phoneHooks";
import { phoneSchema, type PhoneSchemaType } from "@/schema/phoneSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AsyncDialogProps } from "react-dialog-async";
import { useForm } from "react-hook-form";

export interface EditPhoneDialogProps {
  id: string;
  phone: PhoneSchemaType;
}

export const EditPhoneDialog = ({
  isOpen,
  handleClose,
  data: editPhoneDialogData,
}: AsyncDialogProps<EditPhoneDialogProps, boolean>) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      brand: editPhoneDialogData?.phone.brand ?? "",
      name: editPhoneDialogData?.phone.name ?? "",
      releaseDate: editPhoneDialogData?.phone.releaseDate ?? "",
      root: null,
    },
  });

  const { mutateAsync, isPending } = useEditPhone(setError);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => !isOpen && handleClose(false)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Phone</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            await mutateAsync({ id: editPhoneDialogData.id, data });
            handleClose(true);
          })}
        >
          <Input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="m-2"
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
          <Input
            type="text"
            placeholder="Brand"
            {...register("brand")}
            className="m-2"
          />
          <ErrorMessage
            errors={errors}
            name="brand"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
          <Input
            type="text"
            placeholder="Release Date"
            {...register("releaseDate")}
            className="m-2"
          />
          <ErrorMessage
            errors={errors}
            name="releaseDate"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Editing..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
