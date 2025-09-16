"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationUpdateSchema = exports.educationCreateSchema = void 0;
const zod_1 = require("zod");
exports.educationCreateSchema = zod_1.z.object({
    institution: zod_1.z.string().min(1, 'Institution is required'),
    degree: zod_1.z.string().min(1, 'Degree is required'),
    field: zod_1.z.string().min(1, 'Field is required'),
    startDate: zod_1.z.string().datetime().or(zod_1.z.date()),
    endDate: zod_1.z.string().datetime().or(zod_1.z.date()).optional(),
    current: zod_1.z.boolean().optional(),
});
exports.educationUpdateSchema = zod_1.z.object({
    institution: zod_1.z.string().min(1, 'Institution is required').optional(),
    degree: zod_1.z.string().min(1, 'Degree is required').optional(),
    field: zod_1.z.string().min(1, 'Field is required').optional(),
    startDate: zod_1.z.string().datetime().or(zod_1.z.date()).optional(),
    endDate: zod_1.z.string().datetime().or(zod_1.z.date()).optional(),
    current: zod_1.z.boolean().optional(),
});
