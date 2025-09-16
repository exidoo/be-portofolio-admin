import { z } from 'zod';

export const profileCreateSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string()
});

export const profileUpdateSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string()
});

export const profileImageUploadSchema = z.object({
  // Validasi untuk upload gambar akan dilakukan di middleware multer
  // Di sini kita hanya perlu memastikan file ada
});