import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brain } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { phoneSchema, type PhoneSchemaType } from "@/schema/phoneSchema";
import { useCreatePhones } from "@/hooks/phoneHooks";

export const CreatePhoneDialog = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      Brand: "",
      Name: "",
      ReleaseDate: "",
      root: null,
    },
  });

  const { mutate, isPending } = useCreatePhones(setError, setOpen, reset);

  const onSubmit = (data: PhoneSchemaType) => {
    console.log("SUBMIT DATA:", data);
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Create a new phone
          <Brain className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Create a new phone
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            type="text"
            placeholder="Brand"
            {...register("Brand")}
            className="w-full"
          />
          <ErrorMessage
            errors={errors}
            name="Brand"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          <Input
            type="text"
            placeholder="Name"
            {...register("Name")}
            className="w-full"
          />
          <ErrorMessage
            errors={errors}
            name="Name"
            render={({ message }) => (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          />
          <Input
            type="text"
            placeholder="Release Date"
            {...register("ReleaseDate")}
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
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto cursor-pointer"
            >
              {isPending ? "Creating..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
