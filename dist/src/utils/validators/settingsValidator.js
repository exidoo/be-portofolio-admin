"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsUpdateSchema = void 0;
const zod_1 = require("zod");
exports.settingsUpdateSchema = zod_1.z.object({
    themeColor: zod_1.z.string().optional(),
    seoTitle: zod_1.z.string().optional(),
    seoDescription: zod_1.z.string().optional()
});
