declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_AUTH_ENABLED: string;
    NEXT_PUBLIC_PAYMENTS_ENABLED: string;
    NEXT_PUBLIC_GA_TRACKING_ID?: string;
    DATABASE_URL: string;
    CLERK_SECRET_KEY: string;
    CLERK_PUBLISHABLE_KEY: string;
    STRIPE_SECRET_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    UPLOADTHING_SECRET?: string;
    UPLOADTHING_APP_ID?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
