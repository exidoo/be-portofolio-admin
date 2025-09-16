import { z } from 'zod';
export declare const projectCreateSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    technologies: z.ZodArray<z.ZodString>;
    projectUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    githubUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    category: z.ZodString;
    featured: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const projectUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    technologies: z.ZodOptional<z.ZodArray<z.ZodString>>;
    projectUrl: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    githubUrl: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    category: z.ZodOptional<z.ZodString>;
    featured: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const projectImageUploadSchema: z.ZodObject<{}, z.core.$strip>;
//# sourceMappingURL=projectValidator.d.ts.map