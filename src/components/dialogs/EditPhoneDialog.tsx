import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Phone } from "@/models/phone";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AsyncDialogProps } from "react-dialog-async";
import { useForm } from "react-hook-form";
import { phoneSchema, type PhoneSchemaType } from "@/schema/phoneSchema";
import { useEditPhone } from "@/hooks/phoneHooks";

export interface EditPhoneDialogProps {
  _id: string;
  phone: Phone;
}

export const EditPhoneDialog = ({
  isOpen,
  handleClose,
  data,
}: AsyncDialogProps<EditPhoneDialogProps, boolean>) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      Brand: data?.phone?.Brand ?? "",
      Name: data?.phone?.Name ?? "",
      ReleaseDate: data?.phone?.ReleaseDate ?? "",
      root: null,
    },
  });

  const { isPending, mutate } = useEditPhone(setError, handleClose);

  const onSubmit = handleSubmit((formData: PhoneSchemaType) => {
    if (!data?.phone) return;
    mutate(
      {
        id: data.phone._id,
        data: formData,
      },
      {
        onSuccess: () => handleClose(true),
      },
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose(false)}>
      <DialogContent className="w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Edit Phone</DialogTitle>
          <DialogDescription className="text-sm">
            Update the phone information and save changes
          </DialogDescription>
        </DialogHeader>
        <form id="edit-phone-form" onSubmit={onSubmit} className="space-y-3">
          <Input
            {...register("Brand")}
            placeholder="Brand"
            className="w-full"
          />
          <ErrorMessage
            errors={errors}
            name="Brand"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          <Input {...register("Name")} placeholder="Name" className="w-full" />
          <ErrorMessage
            errors={errors}
            name="Name"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          <Input
            {...register("ReleaseDate")}
            placeholder="Release Date"
            className="w-full"
          />
          <ErrorMessage
            errors={errors}
            name="ReleaseDate"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message} </p>
          )}
        </form>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-phone-form"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Editing..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
