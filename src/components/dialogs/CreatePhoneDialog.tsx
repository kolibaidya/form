import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreatePhones } from "@/hooks/phoneHooks";
import { phoneSchema, type PhoneSchemaType } from "@/schema/phoneSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brain } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function CreatePhoneDialog() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      brand: "",
      name: "",
      releaseDate: "",
      root: null,
    },
  });

  const { mutateAsync, isPending } = useCreatePhones(setError, setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create a new phone
          <Brain />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new Phone</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            await mutateAsync(data);
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
              {isPending ? "Creating..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
