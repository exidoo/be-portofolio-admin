import { z } from 'zod';
export declare const testimonialCreateSchema: z.ZodObject<{
    name: z.ZodString;
    position: z.ZodString;
    company: z.ZodString;
    content: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
    approved: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const testimonialUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    approved: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=testimonialValidator.d.ts.map