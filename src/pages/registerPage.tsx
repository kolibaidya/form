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
import { Loader2 } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-zinc-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-zinc-900 mb-2">
              Create account
            </h1>
            <p className="text-zinc-500 text-sm">
              Get started with your new account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                disabled={isPending}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
                className="h-11 border-zinc-300 transition-colors duration-150 ease-out focus-visible:ring-indigo-500 focus-visible:ring-offset-0"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="mt-1.5 text-sm text-red-600" role="alert">{message}</p>
                )}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Username
              </label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Choose a username"
                disabled={isPending}
                spellCheck={false}
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
                autoComplete="new-password"
                placeholder="Create a password"
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
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
