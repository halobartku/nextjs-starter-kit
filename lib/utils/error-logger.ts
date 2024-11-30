interface ErrorLoggerOptions {
  context?: Record<string, any>;
  tags?: string[];
  user?: {
    id: string;
    email?: string;
  };
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private initialized = false;

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  init() {
    if (this.initialized) return;
    
    // Initialize error tracking service (e.g., Sentry)
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // Add initialization code here
      console.log('Error tracking initialized');
    }
    
    this.initialized = true;
  }

  log(error: Error, options: ErrorLoggerOptions = {}) {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error);
      if (options.context) console.error('Context:', options.context);
      if (options.tags) console.error('Tags:', options.tags);
      if (options.user) console.error('User:', options.user);
      return;
    }

    // In production, could send to error tracking service
    // Add production error tracking logic here

    // For now, just log to console in production too
    console.error('Error:', error);
  }

  logApiError(error: Error, endpoint: string, options: ErrorLoggerOptions = {}) {
    this.log(error, {
      ...options,
      context: {
        ...options.context,
        endpoint,
      },
      tags: [...(options.tags || []), 'api'],
    });
  }

  logAuthError(error: Error, action: string, options: ErrorLoggerOptions = {}) {
    this.log(error, {
      ...options,
      context: {
        ...options.context,
        action,
      },
      tags: [...(options.tags || []), 'auth'],
    });
  }
}

export const errorLogger = ErrorLogger.getInstance();
