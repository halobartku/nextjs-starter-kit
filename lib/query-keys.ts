export const queryKeys = {
  user: {
    profile: (userId: string) => ['user', 'profile', userId],
    settings: (userId: string) => ['user', 'settings', userId],
  },
  projects: {
    all: ['projects'],
    detail: (id: string) => ['projects', id],
    userProjects: (userId: string) => ['projects', 'user', userId],
  },
  dashboard: {
    stats: ['dashboard', 'stats'],
    recentActivity: ['dashboard', 'activity'],
  },
} as const;
