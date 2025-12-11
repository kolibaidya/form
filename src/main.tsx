import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { DialogOutlet, DialogProvider } from "react-dialog-async";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <App />
        <DialogOutlet />
      </DialogProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
