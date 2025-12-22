import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient } from "./queryClient";
import { router } from "./router";
import { DialogOutlet, DialogProvider } from "react-dialog-async";

export const AppProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <RouterProvider router={router} />
        <DialogOutlet />
      </DialogProvider>
    </QueryClientProvider>
  );
};
