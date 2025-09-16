import { z } from "zod";

export const skillCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required").optional(),
  proficiency: z.number().min(1).max(5).optional(),
  icon: z.string().optional(),
});

export const skillUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  proficiency: z.number().min(1).max(5).optional(),
  icon: z.string().optional(),
});
