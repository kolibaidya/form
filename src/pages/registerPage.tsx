import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/schema/registerSchema";
import { useRegister } from "@/hooks/userHooks";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      root: null,
    },
  });
  const { mutateAsync, isPending } = useRegister(setError);

  const onSubmit = async (data: RegisterSchemaType) => {
    console.log("Data from react-hook-form handleSubmit:", data);
    await mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 border rounded shadow flex flex-col gap-4 bg-white"
    >
      <h2 className="text-2xl font-semibold text-center">Register</h2>

      <Input type="email" placeholder="Email" {...register("email")} />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => <p className="text-red-500">{message}</p>}
      />

      <Input type="text" placeholder="Username" {...register("username")} />
      <ErrorMessage
        errors={errors}
        name="username"
        render={({ message }) => <p className="text-red-500">{message}</p>}
      />

      <Input type="password" placeholder="Password" {...register("password")} />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => <p className="text-red-500">{message}</p>}
      />

      <ErrorMessage
        errors={errors}
        name="root"
        render={({ message }) => <p className="text-red-500">{message}</p>}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
