import { z } from "zod";

export const homeSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  subtitle: z.string().min(1, "Subtitle is required").max(200),
  description: z.string().min(1, "Description is required").max(1000),
  heroImage: z.string().optional().nullable(),
  ctaText: z.string().max(50).optional().nullable(),
  ctaLink: z
    .string()
    .min(1, "Route is required")
    .max(200)
    .optional()
    .nullable(),
});

export const homeUpdateSchema = homeSchema.partial();

export type HomeInput = z.infer<typeof homeSchema>;
export type HomeUpdateInput = z.infer<typeof homeUpdateSchema>;
