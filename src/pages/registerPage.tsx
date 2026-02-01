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
    <div className="min-h-screen flex item-center justify-center px-4 py-8 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 sm:p-8 border rounded-lg shadow-lg bg-white flex flex-col gap-5"
        aria-label="Register form"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
          Register
        </h2>

        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full"
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <p className="text-red-500 text-sm sm:text-base">{message}</p>
          )}
        />

        <Input
          type="text"
          placeholder="Username"
          {...register("username")}
          className="w-full"
        />
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => (
            <p className="text-red-500 text-sm sm:text-base">{message}</p>
          )}
        />

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p className="text-red-500 text-sm sm:text-base">{message}</p>
          )}
        />

        <ErrorMessage
          errors={errors}
          name="root"
          render={({ message }) => (
            <p className="text-red-500 text-sm sm:text-base text-center">
              {message}
            </p>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full py-2 sm:py-3 mt-2 transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
        >
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
