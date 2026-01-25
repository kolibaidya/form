import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginSchemaType } from "@/schema/loginSchema";
import { useLogin } from "@/hooks/userHooks";
import { useAuthStore } from "@/stores/authStore";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/dashboard/products" replace />;
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      root: null,
    },
  });
  const { mutateAsync, isPending } = useLogin(setError);

  const onSubmit = async (data: LoginSchemaType) => {
    await mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 border rounded shadow flex flex-col gap-4 bg-white"
    >
      <h2 className="text-2xl font-semibold text-center">Login</h2>

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
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
