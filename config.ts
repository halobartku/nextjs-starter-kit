const config = {
  auth: {
    enabled: process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true',
  },
  payments: {
    enabled: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true',
  },
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  environment: process.env.NODE_ENV || 'development',
};

export default config;
