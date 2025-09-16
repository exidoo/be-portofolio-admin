import { z } from 'zod';
export declare const blogCreateSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    category: z.ZodString;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    published: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const blogUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    published: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=blogValidator.d.ts.map