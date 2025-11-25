import type { RegisterSchemaType } from "@/schema/registerSchema";
import { useMutation } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
      const result = await res.json();
      localStorage.setItem("token", result.token);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      setError("root", { type: "server", message: (error as Error).message });
    },
  });
};
