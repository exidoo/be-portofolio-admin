import { z } from "zod";

export const projectCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  projectUrl: z.url().optional().or(z.literal("")),
  githubUrl: z.url().optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean().optional(),
});

export const projectUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  technologies: z.array(z.string()).optional(),
  projectUrl: z.url().optional().or(z.literal("")).optional(),
  githubUrl: z.url().optional().or(z.literal("")).optional(),
  category: z.string().min(1, "Category is required").optional(),
  featured: z.boolean().optional(),
});

export const projectImageUploadSchema = z.object({
  // Validasi untuk upload gambar akan dilakukan di middleware multer
});
