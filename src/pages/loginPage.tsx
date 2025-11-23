import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/schema/loginSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setServerError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      if (!res.ok) {
        setServerError("Invalid username or password");
        return;
      }
      const result = await res.json();
      localStorage.setItem("token", result.token);
      navigate("/products");
    } catch (err) {
      setServerError("Something went wrong. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 border rounded shadow flex flex-col gap-4 bg-white"
    >
      <h2 className="text-2xl font-semibold text-center">Login</h2>

      <Input type="text" placeholder="Username" {...register("username")} />
      {errors.username && (
        <p className="text-red-500">{errors.username.message}</p>
      )}

      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      {serverError && <p className="text-red-600 text-center">{serverError}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
