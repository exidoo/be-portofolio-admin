// Express Tools
import { Request, Response } from "express";

// JWT & Hash Tools
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Prisma Tools
import { prisma } from "../../prisma/client";

// Validators
import { registerSchema, loginSchema } from "../utils/validators/authValidator";

const JWT_SECRET = process.env.JWT_SECRET || "portofolio_secret";

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
    }
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    });

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Register failed", error });
  }
  return;
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        Profile: true, // ambil profile (1-1 relasi)
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT hanya isi field penting
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Format response sesuai kebutuhan
    res.json({
      content: {
        user: {
          id: user.id,
          email: user.email,
          profile: user.Profile
            ? {
                id: user.Profile.id,
                name: user.Profile.name,
                title: user.Profile.title,
                bio: user.Profile.bio,
                image: user.Profile.image,
                email: user.Profile.email,
                phone: user.Profile.phone,
                location: user.Profile.location,
                socialLinks: user.Profile.socialLinks,
                createdAt: user.Profile.createdAt,
                updatedAt: user.Profile.updatedAt,
              }
            : null,
        },
        token,
      },
      message: "Successfully Logged In!",
      errors: [],
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};
