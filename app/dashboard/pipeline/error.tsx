"use client";

import { ResourceError } from '@/components/dashboard/resource-error';

export default function PipelineError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ResourceError
      title="Error loading pipeline"
      message={error.message}
      onRetry={reset}
    />
  );
}
