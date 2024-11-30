import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiError } from '../api-client';

interface UseInfiniteQueryWithToastOptions<TData> {
  enabled?: boolean;
  errorMessage?: string | ((error: ApiError) => string);
  getNextPageParam?: (lastPage: TData) => any;
}

export function useInfiniteQueryWithToast<TData>(
  queryKey: any[],
  queryFn: (pageParam?: any) => Promise<TData>,
  options: UseInfiniteQueryWithToastOptions<TData> = {}
) {
  return useInfiniteQuery<TData, ApiError>({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: options.getNextPageParam,
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
