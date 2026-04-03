import { Loader2 } from "lucide-react";

export const PageLoader = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-zinc-50"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
    </div>
  );
};
