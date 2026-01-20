import type { LoginSchemaType } from "@/schema/loginSchema";
import type { RegisterSchemaType } from "@/schema/registerSchema";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";
import { useNavigate } from "react-router";

export const useLogin = (setError: UseFormSetError<LoginSchemaType>) => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const res = await fetch("http://localhost:3000/api/auth/login", {
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

      return res.json();
    },

    onSuccess: (user) => {
      login(user);
      navigate("/dashboard/products");
    },
    onError: (error) => {
      setError("root", { type: "server", message: (error as Error).message });
    },
  });
};

export const useRegister = (setError: UseFormSetError<RegisterSchemaType>) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      const res = await fetch("https://fakestoreapi.com/users", {
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
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      setError("root", { type: "server", message: (error as Error).message });
    },
  });
};
