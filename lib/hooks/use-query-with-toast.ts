import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseQueryWithToastOptions<TData> {
  enabled?: boolean;
  errorMessage?: string;
  retry?: boolean;
}

export function useQueryWithToast<TData>(
  queryKey: unknown[],
  queryFn: () => Promise<TData>,
  options: UseQueryWithToastOptions<TData> = {}
) {
  return useQuery({
    queryKey,
    queryFn,
    enabled: options.enabled,
    retry: options.retry ?? false,
    onError: (error: Error) => {
      toast.error(options.errorMessage || error.message || 'An error occurred');
    },
  });
}
