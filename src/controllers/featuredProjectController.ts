import { Request, Response } from "express";
import prisma from "../../prisma/client";
import {
  featuredProjectSchema,
  featuredProjectUpdateSchema,
} from "../utils/validators/featuredProjectValidator";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary";

export const featuredProjectController = {
  // Get all featured projects
  async getFeaturedProjects(req: Request, res: Response) {
    try {
      const featuredProjects = await prisma.featuredProject.findMany({
        orderBy: { order: "asc" },
        include: {
          work: true,
        },
      });

      res.json(featuredProjects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get featured project by ID
  async getFeaturedProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const featuredProject = await prisma.featuredProject.findUnique({
        where: { id },
        include: {
          work: true,
        },
      });

      if (!featuredProject) {
        return res.status(404).json({ error: "Featured project not found" });
      }

      res.json(featuredProject);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create featured project
  async createFeaturedProject(req: Request, res: Response) {
    try {
      const validatedData = featuredProjectSchema.parse(req.body);

      // Handle image upload if provided
      if (req.file) {
        validatedData.thumbnail = await uploadToCloudinary(
          req.file,
          "featured-projects"
        );
      }

      // Transform data untuk match dengan expected type Prisma
      const prismaData = {
        ...validatedData,
        workId: validatedData.workId || undefined, // Pastikan undefined bukan null
      };

      const featuredProject = await prisma.featuredProject.create({
        data: prismaData, // Gunakan transformed data
      });

      res.status(201).json(featuredProject);
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  // Update featured project
  async updateFeaturedProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = featuredProjectUpdateSchema.parse(req.body);

      // Get current featured project
      const currentProject = await prisma.featuredProject.findUnique({
        where: { id },
      });

      // Handle image upload
      if (req.file) {
        if (currentProject?.thumbnail) {
          await deleteFromCloudinary(currentProject.thumbnail);
        }
        validatedData.thumbnail = await uploadToCloudinary(
          req.file,
          "featured-projects"
        );
      }

      // Transform data untuk match dengan expected type Prisma
      const prismaData = {
        ...validatedData,
        workId: validatedData.workId || undefined, // Pastikan undefined bukan null
      };

      const featuredProject = await prisma.featuredProject.update({
        where: { id },
        data: prismaData, // Gunakan transformed data
      });

      res.json(featuredProject);
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ error: error.errors });
      } else if (error.code === "P2025") {
        res.status(404).json({ error: "Featured project not found" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
  // Delete featured project
  async deleteFeaturedProject(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const featuredProject = await prisma.featuredProject.findUnique({
        where: { id },
      });

      if (!featuredProject) {
        return res.status(404).json({ error: "Featured project not found" });
      }

      // Delete image from Cloudinary if exists
      if (featuredProject.thumbnail) {
        await deleteFromCloudinary(featuredProject.thumbnail);
      }

      await prisma.featuredProject.delete({
        where: { id },
      });

      res.json({ message: "Featured project deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({ error: "Featured project not found" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  // Reorder featured projects
  async reorderFeaturedProjects(req: Request, res: Response) {
    try {
      const { orderUpdates } = req.body;

      if (!Array.isArray(orderUpdates)) {
        return res.status(400).json({ error: "orderUpdates must be an array" });
      }

      const transactions = orderUpdates.map(
        (update: { id: string; order: number }) =>
          prisma.featuredProject.update({
            where: { id: update.id },
            data: { order: update.order },
          })
      );

      await prisma.$transaction(transactions);

      res.json({ message: "Featured projects reordered successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
