import { z } from "zod";

export const featuredProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  shortDescription: z.string().min(1, "Short description is required").max(300),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  route: z.string().min(1, "Route is required").max(200),
  order: z.number().int().min(0, "Order must be positive").default(0),
  workId: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? val : undefined)), // Pastikan null/empty menjadi undefined
});

export const featuredProjectUpdateSchema = featuredProjectSchema.partial();

export type FeaturedProjectInput = z.infer<typeof featuredProjectSchema>;
export type FeaturedProjectUpdateInput = z.infer<
  typeof featuredProjectUpdateSchema
>;
