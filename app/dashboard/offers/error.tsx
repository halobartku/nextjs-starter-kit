"use client";

import { ResourceError } from '@/components/dashboard/resource-error';

export default function OffersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ResourceError
      title="Error loading offers"
      message={error.message}
      onRetry={reset}
    />
  );
}
