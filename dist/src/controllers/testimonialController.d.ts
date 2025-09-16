import { Request, Response } from "express";
export declare const getAllTestimonials: (req: Request, res: Response) => Promise<void>;
export declare const getTestimonialById: (req: Request, res: Response) => Promise<void>;
export declare const getApprovedTestimonials: (req: Request, res: Response) => Promise<void>;
export declare const createTestimonial: (req: Request, res: Response) => Promise<void>;
export declare const updateTestimonial: (req: Request, res: Response) => Promise<void>;
export declare const deleteTestimonial: (req: Request, res: Response) => Promise<void>;
export declare const uploadTestimonialImage: (req: Request, res: Response) => Promise<void>;
export declare const uploadTestimonialImageMiddleware: import("express").RequestHandler<import("@types/express-serve-static-core").ParamsDictionary, any, any, import("@types/qs").ParsedQs, Record<string, any>>;
//# sourceMappingURL=testimonialController.d.ts.map