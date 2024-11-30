import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../api-client';

interface UseMutationWithToastOptions<TData, TVariables> {
  invalidateQueries?: string[][];
  successMessage?: string | ((data: TData) => string);
  errorMessage?: string | ((error: ApiError) => string);
  onSuccess?: (data: TData) => void | Promise<void>;
  onError?: (error: ApiError) => void | Promise<void>;
}

export function useMutationWithToast<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseMutationWithToastOptions<TData, TVariables> = {}
) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationFn,
    onSuccess: async (data) => {
      // Invalidate queries if specified
      if (options.invalidateQueries) {
        await Promise.all(
          options.invalidateQueries.map((query) =>
            queryClient.invalidateQueries({ queryKey: query })
          )
        );
      }

      // Show success toast
      const message =
        typeof options.successMessage === 'function'
          ? options.successMessage(data)
          : options.successMessage || 'Operation successful';
      toast.success(message);

      // Call onSuccess callback if provided
      if (options.onSuccess) {
        await options.onSuccess(data);
      }
    },
    onError: async (error) => {
      // Show error toast
      const message =
        typeof options.errorMessage === 'function'
          ? options.errorMessage(error)
          : options.errorMessage || error.message || 'An error occurred';
      toast.error(message);

      // Call onError callback if provided
      if (options.onError) {
        await options.onError(error);
      }
    },
  });
}
