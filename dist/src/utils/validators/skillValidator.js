"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillUpdateSchema = exports.skillCreateSchema = void 0;
const zod_1 = require("zod");
exports.skillCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    category: zod_1.z.string().min(1, "Category is required").optional(),
    proficiency: zod_1.z.number().min(1).max(5).optional(),
    icon: zod_1.z.string().optional(),
});
exports.skillUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    category: zod_1.z.string().min(1, "Category is required").optional(),
    proficiency: zod_1.z.number().min(1).max(5).optional(),
    icon: zod_1.z.string().optional(),
});
