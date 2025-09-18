// Express Tools
import { Request, Response } from "express";

// Prisma Tools
import { prisma } from "../../prisma/client";

// Validator
import {
  blogCreateSchema,
  blogUpdateSchema,
} from "../utils/validators/blogValidator";

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
  fileFilter: (
    _req: any,
    file: { mimetype: string },
    cb: (arg0: null, arg1: boolean) => void
  ) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!") as any, false);
    }
  },
});

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs", error });
  }
  return;
};

export const getPublishedBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ blogs });
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    res.status(500).json({ message: "Failed to fetch published blogs", error });
  }
  return;
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    res.json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Failed to fetch blog", error });
  }
  return;
};

export const getPublishedBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: {
        id,
        published: true,
      },
    });

    if (!blog) {
      res.status(404).json({ message: "Blog not found or not published" });
      return;
    }

    res.json({ blog });
  } catch (error) {
    console.error("Error fetching published blog:", error);
    res.status(500).json({ message: "Failed to fetch published blog", error });
  }
  return;
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const parsed = blogCreateSchema.safeParse(req.body);

    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }

    let imageUrl = null;

    // Handle image upload
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, "blogs");
    }

    const blog = await prisma.blog.create({
      data: {
        ...parsed.data,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    res.status(201).json({ message: "Blog created", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Failed to create blog", error });
  }
  return;
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = blogUpdateSchema.safeParse(req.body);

    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    let imageUrl = null;

    // Handle image upload
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, "blogs");

      // Delete old image from Cloudinary if exists
      if (existingBlog.image) {
        await deleteFromCloudinary(existingBlog.image);
      }
    }

    // Update blog
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        ...parsed.data,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    res.json({ message: "Blog updated", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Failed to update blog", error });
  }
  return;
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    // Delete image from Cloudinary if exists
    if (existingBlog.image) {
      await deleteFromCloudinary(existingBlog.image);
    }

    // Delete blog
    await prisma.blog.delete({
      where: { id },
    });

    res.json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Failed to delete blog", error });
  }
  return;
};

// Export upload middleware
export const uploadBlogImageMiddleware = upload.single("image");
