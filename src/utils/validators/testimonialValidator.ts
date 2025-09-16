import { z } from 'zod';

export const testimonialCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.string().optional(),
  approved: z.boolean().optional(),
});

export const testimonialUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  position: z.string().min(1, 'Position is required').optional(),
  company: z.string().min(1, 'Company is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  image: z.string().optional(),
  approved: z.boolean().optional(),
});