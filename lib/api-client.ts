import config from '@/config';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  cache?: RequestCache;
  tags?: string[];
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    cache,
    tags,
  } = options;

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${config.apiUrl}${endpoint}`;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    cache,
    next: tags ? { tags } : undefined,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      error.message || 'An error occurred',
      response.status,
      error
    );
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data: any, options?: Omit<FetchOptions, 'method'>) =>
    fetchApi<T>(endpoint, { ...options, method: 'POST', body: data }),

  put: <T>(endpoint: string, data: any, options?: Omit<FetchOptions, 'method'>) =>
    fetchApi<T>(endpoint, { ...options, method: 'PUT', body: data }),

  patch: <T>(
    endpoint: string,
    data: any,
    options?: Omit<FetchOptions, 'method'>
  ) => fetchApi<T>(endpoint, { ...options, method: 'PATCH', body: data }),

  delete: <T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) =>
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
};
