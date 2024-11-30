import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseMutationWithToastOptions<TData, TVariables> {
  onSuccess?: (data: TData) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: string[][];
}

export function useMutationWithToast<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseMutationWithToastOptions<TData, TVariables> = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: async (data) => {
      if (options.invalidateQueries) {
        await Promise.all(
          options.invalidateQueries.map((query) =>
            queryClient.invalidateQueries({ queryKey: query })
          )
        );
      }

      if (options.successMessage) {
        toast.success(options.successMessage);
      }

      if (options.onSuccess) {
        await options.onSuccess(data);
      }
    },
    onError: async (error: Error) => {
      toast.error(options.errorMessage || error.message || 'An error occurred');

      if (options.onError) {
        await options.onError(error);
      }
    },
  });
}
