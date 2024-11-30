import { errorLogger } from './error-logger';
import { ApiError } from '../api-client';

interface ErrorHandlerOptions {
  silent?: boolean;
  rethrow?: boolean;
  context?: Record<string, any>;
}

export async function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): Promise<ApiError> {
  const { silent = false, rethrow = false, context } = options;

  // Convert unknown error to ApiError
  const apiError = normalizeError(error);

  // Log error unless silent
  if (!silent) {
    errorLogger.log(apiError, { context });
  }

  // Rethrow if requested
  if (rethrow) {
    throw apiError;
  }

  return apiError;
}

function normalizeError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500);
  }

  if (typeof error === 'string') {
    return new ApiError(error, 500);
  }

  return new ApiError('An unknown error occurred', 500);
}
