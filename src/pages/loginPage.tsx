import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginSchemaType } from "@/schema/loginSchema";
import { useLogin } from "@/hooks/userHooks";
import { useAuthStore } from "@/stores/authStore";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
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
  const { mutate, isPending } = useLogin(setError);

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-zinc-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-zinc-900 mb-2">
              Welcome back
            </h1>
            <p className="text-zinc-500 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Username
              </label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                disabled={isPending}
                aria-invalid={errors.username ? "true" : "false"}
                {...register("username")}
                className="h-11 border-zinc-300 transition-colors duration-150 ease-out focus-visible:ring-indigo-500 focus-visible:ring-offset-0"
              />
              <ErrorMessage
                errors={errors}
                name="username"
                render={({ message }) => (
                  <p className="mt-1.5 text-sm text-red-600" role="alert">{message}</p>
                )}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={isPending}
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password")}
                className="h-11 border-zinc-300 transition-colors duration-150 ease-out focus-visible:ring-indigo-500 focus-visible:ring-offset-0"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="mt-1.5 text-sm text-red-600" role="alert">{message}</p>
                )}
              />
            </div>

            <ErrorMessage
              errors={errors}
              name="root"
              render={({ message }) => (
                <div 
                  className="text-sm text-red-700 text-center bg-red-50 border border-red-100 rounded-lg py-2.5 px-3" 
                  role="alert"
                >
                  {message}
                </div>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
