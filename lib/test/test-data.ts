export const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  image: 'https://example.com/avatar.jpg',
  createdAt: new Date().toISOString(),
};

export const mockProject = {
  id: '1',
  title: 'Test Project',
  description: 'A test project description',
  status: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  userId: mockUser.id,
};

export const mockSettings = {
  theme: 'light',
  notifications: {
    email: true,
    push: false,
    marketing: false,
  },
  language: 'en',
};

export function generateMockProjects(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    ...mockProject,
    id: String(index + 1),
    title: `Test Project ${index + 1}`,
    createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
  }));
}
