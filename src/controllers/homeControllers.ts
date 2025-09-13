import { Request, Response } from "express";
import prisma from "../../prisma/client";
import {
  homeSchema,
  homeUpdateSchema,
} from "../utils/validators/homeValidator";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary";

export const homeController = {
  // Get home data
  async getHome(req: Request, res: Response) {
    try {
      const home = await prisma.home.findFirst();

      if (!home) {
        return res.status(404).json({ error: "Home data not found" });
      }

      res.json(home);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create home data
  async createHome(req: Request, res: Response) {
    try {
      const validatedData = homeSchema.parse(req.body);

      // Handle image upload if provided
      if (req.file) {
        validatedData.heroImage = await uploadToCloudinary(req.file, "home");
      }

      const home = await prisma.home.create({
        data: validatedData,
      });

      res.status(201).json(home);
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  // Update home data dengan error handling improved
  async updateHome(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = homeUpdateSchema.parse(req.body);

      // Get current home data to check for existing image
      let currentHome;
      try {
        currentHome = await prisma.home.findUnique({
          where: { id },
        });
      } catch (dbError) {
        console.error("Database error in findUnique:", dbError);
        return res.status(500).json({ error: "Database connection error" });
      }

      if (!currentHome) {
        return res.status(404).json({ error: "Home data not found" });
      }

      // Handle image upload if new file provided
      if (req.file) {
        try {
          // Delete old image if exists
          if (currentHome.heroImage) {
            await deleteFromCloudinary(currentHome.heroImage);
          }
          validatedData.heroImage = await uploadToCloudinary(req.file, "home");
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          return res.status(500).json({ error: "Failed to process image" });
        }
      }

      const home = await prisma.home.update({
        where: { id },
        data: validatedData,
      });

      res.json(home);
    } catch (error: any) {
      console.error("Update home error:", error);

      if (error.name === "ZodError") {
        res.status(400).json({ error: error.errors });
      } else if (error.code === "P2025") {
        res.status(404).json({ error: "Home data not found" });
      } else {
        res.status(500).json({
          error: "Internal server error",
          message: error.message,
        });
      }
    }
  },

  // Delete home data
  async deleteHome(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const home = await prisma.home.findUnique({ where: { id } });

      if (!home) {
        return res.status(404).json({ error: "Home data not found" });
      }

      // Delete image from Cloudinary if exists
      if (home.heroImage) {
        await deleteFromCloudinary(home.heroImage);
      }

      await prisma.home.delete({
        where: { id },
      });

      res.json({ message: "Home data deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({ error: "Home data not found" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
};
