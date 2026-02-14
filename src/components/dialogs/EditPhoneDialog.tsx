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

export function EditPhoneDialog({
  isOpen,
  handleClose,
  data,
}: AsyncDialogProps<EditPhoneDialogProps, boolean>) {
  const formKey = data?.phone?._id ?? "edit-phone";

  const form = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema),

    defaultValues: {
      Brand: data?.phone?.Brand ?? "",
      Name: data?.phone?.Name ?? "",
      ReleaseDate: data?.phone?.ReleaseDate ?? "",
      root: null,
    },
  });

  const editPhoneMutation = useEditPhone(form.setError, handleClose);

  const submitHandler = form.handleSubmit((formData) => {
    if (!data?.phone) return;

    editPhoneMutation.mutate(
      {
        id: data.phone._id,
        data: formData,
      },
      {
        onSuccess: () => {
          handleClose(true);
        },
      },
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose(false)}>
      <DialogContent key={formKey} className="w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Edit Phone</DialogTitle>
          <DialogDescription className="text-sm">
            Update the phone information and save changes
          </DialogDescription>
        </DialogHeader>
        <form
          id="edit-phone-form"
          onSubmit={submitHandler}
          className="space-y-3"
        >
          <Input
            {...form.register("Brand")}
            placeholder="Brand"
            className="w-full"
          />
          <ErrorMessage
            errors={form.formState.errors}
            name="Brand"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          <Input
            {...form.register("Name")}
            placeholder="Name"
            className="w-full"
          />
          <ErrorMessage
            errors={form.formState.errors}
            name="Name"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          <Input
            {...form.register("ReleaseDate")}
            placeholder="ReleaseDate"
            className="w-full"
          />
          <ErrorMessage
            errors={form.formState.errors}
            name="ReleaseDate"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.root.message}{" "}
            </p>
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
            disabled={editPhoneMutation.isPending}
            className="w-full sm:w-auto"
          >
            {editPhoneMutation.isPending ? "Editing..." : " Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
