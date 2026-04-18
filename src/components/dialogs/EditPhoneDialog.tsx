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
  } = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      Brand: data?.phone?.Brand ?? "",
      Name: data?.phone?.Name ?? "",
      ReleaseDate: data?.phone?.ReleaseDate ?? "",
    },
  });

  const { isPending, mutateAsync } = useEditPhone(setError, handleClose);

  const onSubmit = async (formData: PhoneSchemaType) => {
    if (!data?.phone?._id) return;
    await mutateAsync({
      id: data.phone._id,
      data: formData,
    });

    handleClose(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose(false)}>
      <DialogContent className="w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Edit Phone</DialogTitle>
          <DialogDescription className="text-sm">
            Update the phone information and save changes
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
          <Input type="date" {...register("ReleaseDate")} className="w-full" />
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

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? "Editing..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
