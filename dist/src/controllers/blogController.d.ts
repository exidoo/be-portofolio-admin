import { Request, Response } from "express";
export declare const getAllBlogs: (req: Request, res: Response) => Promise<void>;
export declare const getPublishedBlogs: (req: Request, res: Response) => Promise<void>;
export declare const getBlogById: (req: Request, res: Response) => Promise<void>;
export declare const getPublishedBlogById: (req: Request, res: Response) => Promise<void>;
export declare const createBlog: (req: Request, res: Response) => Promise<void>;
export declare const updateBlog: (req: Request, res: Response) => Promise<void>;
export declare const deleteBlog: (req: Request, res: Response) => Promise<void>;
export declare const uploadBlogImage: (req: Request, res: Response) => Promise<void>;
export declare const uploadBlogImageMiddleware: import("express").RequestHandler<import("@types/express-serve-static-core").ParamsDictionary, any, any, import("@types/qs").ParsedQs, Record<string, any>>;
//# sourceMappingURL=blogController.d.ts.map