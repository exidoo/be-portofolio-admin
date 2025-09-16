import { z } from 'zod';
export declare const educationCreateSchema: z.ZodObject<{
    institution: z.ZodString;
    degree: z.ZodString;
    field: z.ZodString;
    startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    endDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    current: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const educationUpdateSchema: z.ZodObject<{
    institution: z.ZodOptional<z.ZodString>;
    degree: z.ZodOptional<z.ZodString>;
    field: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    endDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    current: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=educationValidator.d.ts.map