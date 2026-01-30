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
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export default function RegisterPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard/products" replace />;
  }

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
  const { mutate, isPending } = useRegister(setError);

  const onSubmit = (data: RegisterSchemaType) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex-item-center justify-center px-4 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-5 sm:p-6 border rounded-lg shadow bg-white flex flex-col gap-4"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center">
          Register
        </h2>

        <Input type="email" placeholder="Email" {...register("email")} />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <p className="text-red-500 text-sm">{message}</p>
          )}
        />

        <Input type="text" placeholder="Username" {...register("username")} />
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => (
            <p className="text-red-500 text-sm">{message}</p>
          )}
        />

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p className="text-red-500 text-sm">{message}</p>
          )}
        />

        <ErrorMessage
          errors={errors}
          name="root"
          render={({ message }) => (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
