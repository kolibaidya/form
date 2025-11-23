import type { LoginSchemaType } from "@/schema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useLogin = (setError: UseFormSetError<LoginSchemaType>) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      if (!res.ok) {
        throw new Error("Invalid username or password");
      }
      const result = await res.json();
      localStorage.setItem("token", result.token);
    },
    onSuccess: () => {
      navigate("/products");
    },
    onError: (error) => {
      setError("root", { type: "server", message: (error as Error).message });
    },
  });
};
