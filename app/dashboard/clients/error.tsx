"use client";

import { ResourceError } from '@/components/dashboard/resource-error';

export default function ClientsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ResourceError
      title="Error loading clients"
      message={error.message}
      onRetry={reset}
    />
  );
}
