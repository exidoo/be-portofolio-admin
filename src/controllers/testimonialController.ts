// Express Tools
import { Request, Response } from "express";

// Prisma Tools
import { prisma } from "../../prisma/client";

// Validator
import {
  testimonialCreateSchema,
  testimonialUpdateSchema,
} from "../utils/validators/testimonialValidator";

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

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: "Failed to fetch testimonials", error });
  }
  return;
};

export const getTestimonialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      res.status(404).json({ message: "Testimonial not found" });
      return;
    }

    res.json({ testimonial });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    res.status(500).json({ message: "Failed to fetch testimonial", error });
  }
  return;
};

export const getApprovedTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ testimonials });
  } catch (error) {
    console.error("Error fetching approved testimonials:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch approved testimonials", error });
  }
  return;
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const parsed = testimonialCreateSchema.safeParse(req.body);

    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }

    let imageUrl = null;

    // Handle image upload
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, "testimonials");
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        ...parsed.data,
        ...(imageUrl && { image: imageUrl }),
        // Default to not approved
        approved: parsed.data.approved ?? false,
      },
    });

    res.status(201).json({ message: "Testimonial created", testimonial });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({ message: "Failed to create testimonial", error });
  }
  return;
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = testimonialUpdateSchema.safeParse(req.body);

    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }

    // Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      res.status(404).json({ message: "Testimonial not found" });
      return;
    }

    let imageUrl = null;

    // Handle image upload
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, "testimonials");

      // Delete old image from Cloudinary if exists
      if (existingTestimonial.image) {
        await deleteFromCloudinary(existingTestimonial.image);
      }
    }

    // Update testimonial
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...parsed.data,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    res.json({ message: "Testimonial updated", testimonial });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ message: "Failed to update testimonial", error });
  }
  return;
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      res.status(404).json({ message: "Testimonial not found" });
      return;
    }

    // Delete image from Cloudinary if exists
    if (existingTestimonial.image) {
      await deleteFromCloudinary(existingTestimonial.image);
    }

    // Delete testimonial
    await prisma.testimonial.delete({
      where: { id },
    });

    res.json({ message: "Testimonial deleted" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ message: "Failed to delete testimonial", error });
  }
  return;
};

// Export upload middleware
export const uploadTestimonialImageMiddleware = upload.single("image");
