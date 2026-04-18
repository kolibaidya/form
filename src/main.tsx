import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import { DialogOutlet, DialogProvider } from "react-dialog-async";
import { App } from "@/App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <App />
        <DialogOutlet />
      </DialogProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
