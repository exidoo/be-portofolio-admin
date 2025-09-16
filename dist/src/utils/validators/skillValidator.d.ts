import { z } from 'zod';
export declare const skillCreateSchema: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodString;
    proficiency: z.ZodNumber;
    icon: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const skillUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    proficiency: z.ZodOptional<z.ZodNumber>;
    icon: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=skillValidator.d.ts.map