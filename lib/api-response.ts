import { NextResponse } from 'next/server';

export interface ApiResponseSuccess<T> {
  success: true;
  data: T;
}

export interface ApiResponseError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

export const createSuccessResponse = <T>(
  data: T,
  options: ResponseInit = {}
): NextResponse<ApiResponseSuccess<T>> => {
  return NextResponse.json(
    { success: true, data },
    {
      status: options.status || 200,
      headers: {
        ...options.headers,
      },
    }
  );
};

export const createErrorResponse = (
  code: string,
  message: string,
  details?: any,
  status = 400
): NextResponse<ApiResponseError> => {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
      },
    },
    { status }
  );
};

// Common error responses
export const createNotFoundResponse = (message = 'Resource not found') =>
  createErrorResponse('NOT_FOUND', message, null, 404);

export const createUnauthorizedResponse = (message = 'Unauthorized') =>
  createErrorResponse('UNAUTHORIZED', message, null, 401);

export const createForbiddenResponse = (message = 'Forbidden') =>
  createErrorResponse('FORBIDDEN', message, null, 403);

export const createValidationErrorResponse = (details: any) =>
  createErrorResponse('VALIDATION_ERROR', 'Validation failed', details, 400);

export const createServerErrorResponse = (
  message = 'Internal server error',
  details?: any
) => createErrorResponse('INTERNAL_SERVER_ERROR', message, details, 500);
