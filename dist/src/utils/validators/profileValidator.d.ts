import { z } from 'zod';
export declare const profileUpdateSchema: z.ZodObject<{
    name: z.ZodString;
    title: z.ZodString;
    bio: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    location: z.ZodString;
}, z.core.$strip>;
export declare const profileImageUploadSchema: z.ZodObject<{}, z.core.$strip>;
//# sourceMappingURL=profileValidator.d.ts.map