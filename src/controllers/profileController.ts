// Express Tools
import { Request, Response } from "express";

// Prisma Tools
import { prisma } from "../../prisma/client";

// Validator
import {
  profileCreateSchema,
  profileUpdateSchema,
} from "../utils/validators/profileValidator";

// Cloudinary
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary";

// Middleware untuk upload file
import multer from "multer";

// Setup multer untuk upload file
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!") as any, false);
    }
  },
});

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    res.json({ profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Failed to fetch profiles", error });
  }
  return;
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    res.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile", error });
  }
  return;
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const parsed = profileCreateSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
    }

    // Check if profile already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    // Pastikan user ada
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let imageUrl: string | null = null;

    // Handle image upload
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, "profile");
    }

    const profile = await prisma.profile.create({
      data: {
        ...parsed.data,
        ...(imageUrl && { image: imageUrl }),
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({ message: "Profile created", profile });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Failed to create profile", error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const parsed = profileUpdateSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
    }

    // Cek apakah profile sudah ada
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    let imageUrl: string | null = null;

    // Handle upload image baru
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, "profile");

      // Hapus image lama kalau ada
      if (existingProfile.image) {
        try {
          await deleteFromCloudinary(existingProfile.image);
        } catch (err) {
          console.warn("Failed to delete old image from Cloudinary:", err);
        }
      }
    }

    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        ...parsed.data,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return res.status(200).json({ message: "Profile updated", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Failed to update profile", error });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    // Check if profile exists
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    // Delete image from Cloudinary if exists
    if (existingProfile.image) {
      await deleteFromCloudinary(existingProfile.image);
    }

    // Delete profile
    await prisma.profile.delete({
      where: { userId },
    });

    res.json({ message: "Profile deleted" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Failed to delete profile", error });
  }
  return;
};

// Export upload middleware
export const uploadProfileImageMiddleware = upload.single("image");
