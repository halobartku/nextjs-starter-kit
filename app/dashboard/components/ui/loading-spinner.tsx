import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 24, className = "" }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[100px]">
      <Loader2
        size={size}
        className={cn(`animate-spin text-muted-foreground`, className)}
      />
    </div>
  );
}
