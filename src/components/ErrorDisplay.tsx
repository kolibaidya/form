import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: Error;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div 
      className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
      role="alert"
    >
      <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <h3 className="text-sm font-medium text-red-800">Something went wrong</h3>
        <p className="text-sm text-red-600 mt-1">{error.message}</p>
      </div>
    </div>
  );
}
