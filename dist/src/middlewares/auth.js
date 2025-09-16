"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    // Get token
    const token = req.headers["authorization"];
    if (!token) {
        res.status(401).json({ message: "Unauthenticated." });
        return;
    }
    // Verify token
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        // kalau decoded.id ada, simpan ke req.userId
        const payload = decoded;
        req.userId = payload.id;
        next();
    });
};
exports.default = verifyToken;
