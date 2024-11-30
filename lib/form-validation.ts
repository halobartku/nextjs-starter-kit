import { z } from 'zod';

export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
});

export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['draft', 'published', 'archived']),
  visibility: z.enum(['public', 'private']),
});

export const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    marketing: z.boolean(),
  }),
  theme: z.enum(['light', 'dark', 'system']),
  language: z.enum(['en', 'es', 'fr']),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;
