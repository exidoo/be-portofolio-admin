// Express Tools
import { Request, Response } from "express";

// Prisma Tools
import { prisma } from "../../prisma/client";

// Validator
import {
  projectCreateSchema,
  projectUpdateSchema,
} from "../utils/validators/projectValidator";

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

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
  return;
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Failed to fetch project", error });
  }
  return;
};

export const createProject = async (req: Request, res: Response) => {
  try {
    // Convert technologies ke array kalau dikirim sebagai string
    if (req.body.technologies) {
      try {
        req.body.technologies = JSON.parse(req.body.technologies);
      } catch {
        req.body.technologies = req.body.technologies
          .split(",")
          .map((t: string) => t.trim());
      }
    }

    const parsed = projectCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, "projects");
    }

    const project = await prisma.project.create({
      data: {
        ...parsed.data,
        image: imageUrl,
      },
    });

    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project", error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Convert technologies ke array kalau dikirim sebagai string
    if (req.body.technologies) {
      try {
        req.body.technologies = JSON.parse(req.body.technologies);
      } catch {
        req.body.technologies = req.body.technologies
          .split(",")
          .map((t: string) => t.trim());
      }
    }

    const parsed = projectUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    let imageUrl = existingProject.image;

    // Handle image upload
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file, "projects");

      // Delete old image from Cloudinary if exists
      if (existingProject.image) {
        await deleteFromCloudinary(existingProject.image);
      }
    }

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...parsed.data,
        image: imageUrl,
      },
    });

    res.json({ message: "Project updated", project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project", error });
  }
  return;
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // Delete image from Cloudinary if exists
    if (existingProject.image) {
      await deleteFromCloudinary(existingProject.image);
    }

    // Delete project
    await prisma.project.delete({
      where: { id },
    });

    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project", error });
  }
  return;
};

// Export upload middleware
export const uploadProjectImageMiddleware = upload.single("image");
