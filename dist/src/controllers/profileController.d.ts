import { Request, Response } from "express";
export declare const getProfile: (req: Request, res: Response) => Promise<void>;
export declare const updateProfile: (req: Request, res: Response) => Promise<void>;
export declare const uploadProfileImage: (req: Request, res: Response) => Promise<void>;
export declare const uploadProfileImageMiddleware: import("express").RequestHandler<import("@types/express-serve-static-core").ParamsDictionary, any, any, import("@types/qs").ParsedQs, Record<string, any>>;
//# sourceMappingURL=profileController.d.ts.map