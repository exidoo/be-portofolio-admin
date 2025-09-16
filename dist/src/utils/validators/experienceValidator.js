"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceUpdateSchema = exports.experienceCreateSchema = void 0;
const zod_1 = require("zod");
exports.experienceCreateSchema = zod_1.z.object({
    company: zod_1.z.string().min(1, 'Company is required'),
    position: zod_1.z.string().min(1, 'Position is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    startDate: zod_1.z.string().datetime().or(zod_1.z.date()),
    endDate: zod_1.z.string().datetime().or(zod_1.z.date()).optional(),
    current: zod_1.z.boolean().optional(),
});
exports.experienceUpdateSchema = zod_1.z.object({
    company: zod_1.z.string().min(1, 'Company is required').optional(),
    position: zod_1.z.string().min(1, 'Position is required').optional(),
    description: zod_1.z.string().min(1, 'Description is required').optional(),
    startDate: zod_1.z.string().datetime().or(zod_1.z.date()).optional(),
    endDate: zod_1.z.string().datetime().or(zod_1.z.date()).optional(),
    current: zod_1.z.boolean().optional(),
});
