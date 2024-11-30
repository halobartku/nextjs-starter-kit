"use client";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error boundary caught error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Alert variant="destructive" className="max-w-2xl">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col gap-3">
          <p>{error.message || "An unexpected error occurred."}</p>
          <button
            onClick={reset}
            className="bg-destructive/10 hover:bg-destructive/20 text-destructive px-3 py-2 rounded-md text-sm transition-colors w-fit"
          >
            Try again
          </button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
