import { Request, Response } from "express";
export declare const getAllProjects: (req: Request, res: Response) => Promise<void>;
export declare const getProjectById: (req: Request, res: Response) => Promise<void>;
export declare const createProject: (req: Request, res: Response) => Promise<void>;
export declare const updateProject: (req: Request, res: Response) => Promise<void>;
export declare const deleteProject: (req: Request, res: Response) => Promise<void>;
export declare const uploadProjectImage: (req: Request, res: Response) => Promise<void>;
export declare const uploadProjectImageMiddleware: import("express").RequestHandler<import("@types/express-serve-static-core").ParamsDictionary, any, any, import("@types/qs").ParsedQs, Record<string, any>>;
//# sourceMappingURL=projectController.d.ts.map