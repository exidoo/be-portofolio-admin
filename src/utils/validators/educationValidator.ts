import { z } from "zod";

export const educationCreateSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
});

export const educationUpdateSchema = z.object({
  institution: z.string().min(1, "Institution is required").optional(),
  degree: z.string().min(1, "Degree is required").optional(),
  field: z.string().min(1, "Field is required").optional(),
  startDate: z.string().datetime().or(z.date()).optional(),
  endDate: z.string().datetime().or(z.date()).optional(),
  current: z.boolean().optional(),
});
