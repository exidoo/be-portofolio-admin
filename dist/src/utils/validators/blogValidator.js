"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateSchema = exports.blogCreateSchema = void 0;
const zod_1 = require("zod");
exports.blogCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
    excerpt: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    category: zod_1.z.string().min(1, 'Category is required'),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    published: zod_1.z.boolean().optional(),
});
exports.blogUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').optional(),
    content: zod_1.z.string().min(1, 'Content is required').optional(),
    excerpt: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    category: zod_1.z.string().min(1, 'Category is required').optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    published: zod_1.z.boolean().optional(),
});
