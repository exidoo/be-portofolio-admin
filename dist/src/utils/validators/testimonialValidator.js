"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialUpdateSchema = exports.testimonialCreateSchema = void 0;
const zod_1 = require("zod");
exports.testimonialCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    position: zod_1.z.string().min(1, 'Position is required'),
    company: zod_1.z.string().min(1, 'Company is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
    image: zod_1.z.string().optional(),
    approved: zod_1.z.boolean().optional(),
});
exports.testimonialUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').optional(),
    position: zod_1.z.string().min(1, 'Position is required').optional(),
    company: zod_1.z.string().min(1, 'Company is required').optional(),
    content: zod_1.z.string().min(1, 'Content is required').optional(),
    image: zod_1.z.string().optional(),
    approved: zod_1.z.boolean().optional(),
});
