// Import express types
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Request biar bisa nambahin userId
interface AuthRequest extends Request {
  userId?: string | number;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  let authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthenticated." });
  }

  // kalau ada prefix Bearer, buang dulu
  if (authHeader.startsWith("Bearer ")) {
    authHeader = authHeader.split(" ")[1];
  }

  jwt.verify(authHeader, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const payload = decoded as JwtPayload & { id: string | number };
    req.userId = payload.id;

    next();
  });
};

export default verifyToken;
