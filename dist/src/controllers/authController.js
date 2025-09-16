"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
// JWT & Hash Tools
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Prisma Tools
const client_1 = __importDefault(require("../../prisma/client"));
// Validators
const authValidator_1 = require("../utils/validators/authValidator");
const JWT_SECRET = process.env.JWT_SECRET || "cafe_secret";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = authValidator_1.registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
        }
        const { name, email, password } = req.body;
        // Check if user exists
        const existingUser = yield client_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashed = yield bcrypt_1.default.hash(password, 10);
        const user = yield client_1.default.user.create({
            data: {
                email,
                password: hashed,
            },
        });
        res.status(201).json({ message: "User registered", user });
    }
    catch (error) {
        res.status(500).json({ message: "Register failed", error });
    }
    return;
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = authValidator_1.loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
        }
        const { email, password } = req.body;
        const user = yield client_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            return res.status(401).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
    return;
});
exports.login = login;
