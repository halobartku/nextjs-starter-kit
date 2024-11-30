import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseInfiniteQueryWithToastOptions<TData> {
  enabled?: boolean;
  errorMessage?: string;
  getNextPageParam?: (lastPage: TData) => unknown;
}

export function useInfiniteQueryWithToast<TData>(
  queryKey: unknown[],
  queryFn: (pageParam?: unknown) => Promise<TData>,
  options: UseInfiniteQueryWithToastOptions<TData> = {}
) {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: options.getNextPageParam,
    enabled: options.enabled,
    onError: (error: Error) => {
      toast.error(options.errorMessage || error.message || 'An error occurred');
    },
  });
}
