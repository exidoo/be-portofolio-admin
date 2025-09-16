import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    userId?: string | number;
}
declare const verifyToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
export default verifyToken;
//# sourceMappingURL=auth.d.ts.map