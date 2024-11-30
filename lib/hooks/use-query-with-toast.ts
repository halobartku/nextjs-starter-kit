import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiError } from '../api-client';

interface UseQueryWithToastOptions<TData> {
  enabled?: boolean;
  errorMessage?: string | ((error: ApiError) => string);
}

export function useQueryWithToast<TData>(
  queryKey: any[],
  queryFn: () => Promise<TData>,
  options: UseQueryWithToastOptions<TData> = {}
) {
  return useQuery<TData, ApiError>({
    queryKey,
    queryFn,
    enabled: options.enabled,
    onError: (error) => {
      const message =
        typeof options.errorMessage === 'function'
          ? options.errorMessage(error)
          : options.errorMessage || error.message || 'Failed to load data';
      toast.error(message);
    },
  });
}
