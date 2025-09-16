"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectImageUploadSchema = exports.projectUpdateSchema = exports.projectCreateSchema = void 0;
const zod_1 = require("zod");
exports.projectCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    technologies: zod_1.z.array(zod_1.z.string()).min(1, 'At least one technology is required'),
    projectUrl: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
    githubUrl: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
    category: zod_1.z.string().min(1, 'Category is required'),
    featured: zod_1.z.boolean().optional(),
});
exports.projectUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').optional(),
    description: zod_1.z.string().min(1, 'Description is required').optional(),
    technologies: zod_1.z.array(zod_1.z.string()).optional(),
    projectUrl: zod_1.z.string().url().optional().or(zod_1.z.literal('')).optional(),
    githubUrl: zod_1.z.string().url().optional().or(zod_1.z.literal('')).optional(),
    category: zod_1.z.string().min(1, 'Category is required').optional(),
    featured: zod_1.z.boolean().optional(),
});
exports.projectImageUploadSchema = zod_1.z.object({
// Validasi untuk upload gambar akan dilakukan di middleware multer
});
