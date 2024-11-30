const config = {
  app: {
    name: 'Nextjs Starter Kit',
    description: 'The Ultimate Nextjs 14 Starter Kit for quickly building your SaaS',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    version: '1.0.0',
  },
  auth: {
    enabled: process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true',
    providers: {
      github: process.env.NEXT_PUBLIC_GITHUB_AUTH_ENABLED === 'true',
      google: process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === 'true',
    },
  },
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    rateLimiting: {
      enabled: true,
      maxRequests: 100,
      timeWindow: 60 * 1000, // 1 minute
    },
  },
  features: {
    analytics: {
      enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
      providers: {
        ga: process.env.NEXT_PUBLIC_GA_TRACKING_ID ? true : false,
      },
    },
    errorTracking: {
      enabled: process.env.NEXT_PUBLIC_ERROR_TRACKING_ENABLED === 'true',
      providers: {
        sentry: process.env.NEXT_PUBLIC_SENTRY_DSN ? true : false,
      },
    },
    payments: {
      enabled: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true',
      providers: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? true : false,
      },
    },
    uploads: {
      enabled: process.env.NEXT_PUBLIC_UPLOADS_ENABLED === 'true',
      providers: {
        uploadthing: process.env.UPLOADTHING_APP_ID ? true : false,
      },
      maxSizeMB: 10,
      allowedTypes: ['image/*', 'application/pdf'],
    },
  },
  theme: {
    defaultTheme: 'system' as const,
    systemTheme: true,
  },
};

export type Config = typeof config;

export default config;
