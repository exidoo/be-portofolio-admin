import { z } from 'zod';
export declare const experienceCreateSchema: z.ZodObject<{
    company: z.ZodString;
    position: z.ZodString;
    description: z.ZodString;
    startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    endDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    current: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const experienceUpdateSchema: z.ZodObject<{
    company: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    endDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    current: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=experienceValidator.d.ts.map