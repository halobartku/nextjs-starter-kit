import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { ZodSchema } from 'zod';

type ApiHandler = (req: NextRequest, auth: ReturnType<typeof getAuth>) => Promise<NextResponse>;

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

export class ApiException extends Error {
  constructor(public error: ApiError) {
    super(error.message);
  }
}

export const createApiHandler = (
  handler: ApiHandler,
  options: {
    requireAuth?: boolean;
    validateBody?: ZodSchema;
  } = {}
) => {
  return async function apiRoute(req: NextRequest) {
    try {
      // CORS headers
      if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Authentication check
      const auth = getAuth(req);
      if (options.requireAuth && !auth.userId) {
        throw new ApiException({
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
          status: 401,
        });
      }

      // Body validation
      if (options.validateBody && req.method !== 'GET') {
        const body = await req.json();
        try {
          options.validateBody.parse(body);
        } catch (error) {
          throw new ApiException({
            code: 'INVALID_BODY',
            message: 'Invalid request body',
            status: 400,
          });
        }
      }

      // Execute handler
      const response = await handler(req, auth);
      
      // Add CORS headers to response
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;

    } catch (error) {
      if (error instanceof ApiException) {
        return NextResponse.json(
          { error: error.error },
          { status: error.error.status }
        );
      }

      console.error('API Error:', error);
      return NextResponse.json(
        {
          error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred',
            status: 500,
          },
        },
        { status: 500 }
      );
    }
  };
};
