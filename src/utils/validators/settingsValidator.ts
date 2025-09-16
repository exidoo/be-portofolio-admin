import { z } from 'zod';

export const settingsUpdateSchema = z.object({
  themeColor: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});