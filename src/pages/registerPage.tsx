import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/schema/registerSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setServerError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setServerError(result.message || "Registration failed");
        return;
      }
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      setServerError("Something went wrong. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 border rounded shadow flex flex-col gap-4 bg-white"
    >
      <h2 className="text-2xl font-semibold text-center">Register</h2>

      <Input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

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
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
