import { z } from 'zod';

export const experienceCreateSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string().datetime().or(z.date()),
  endDate: z.string().datetime().or(z.date()).optional(),
  current: z.boolean().optional(),
});

export const experienceUpdateSchema = z.object({
  company: z.string().min(1, 'Company is required').optional(),
  position: z.string().min(1, 'Position is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  startDate: z.string().datetime().or(z.date()).optional(),
  endDate: z.string().datetime().or(z.date()).optional(),
  current: z.boolean().optional(),
});