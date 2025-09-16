// Import express types
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Request biar bisa nambahin userId
interface AuthRequest extends Request {
  userId?: string | number;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get token
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Unauthenticated." });
    return;
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // kalau decoded.id ada, simpan ke req.userId
    const payload = decoded as JwtPayload & { id: string | number };
    req.userId = payload.id;

    next();
  });
};

export default verifyToken;
