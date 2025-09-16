"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileImageUploadSchema = exports.profileUpdateSchema = exports.profileCreateSchema = void 0;
const zod_1 = require("zod");
exports.profileCreateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    title: zod_1.z.string(),
    bio: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    location: zod_1.z.string()
});
exports.profileUpdateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    title: zod_1.z.string(),
    bio: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    location: zod_1.z.string()
});
exports.profileImageUploadSchema = zod_1.z.object({
// Validasi untuk upload gambar akan dilakukan di middleware multer
// Di sini kita hanya perlu memastikan file ada
});
