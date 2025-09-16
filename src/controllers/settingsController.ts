// Express Tools
import { Request, Response } from "express";

// Prisma Tools
import prisma from "../../prisma/client";

// Validator
import { settingsUpdateSchema } from "../utils/validators/settingsValidator";

export const getSettings = async (req: Request, res: Response) => {
  try {
    // Get the first (and only) settings record
    let settings = await prisma.settings.findFirst();
    
    // If no settings exist, create default settings
    if (!settings) {
      settings = await prisma.settings.create({
        data: {}
      });
    }
    
    res.json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Failed to fetch settings", error });
  }
  return;
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const parsed = settingsUpdateSchema.safeParse(req.body);
    
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }
    
    // Get the first (and only) settings record
    let settings = await prisma.settings.findFirst();
    
    // If no settings exist, create new settings
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          themeColor: parsed.data.themeColor || null,
          seoTitle: parsed.data.seoTitle || null,
          seoDescription: parsed.data.seoDescription || null
        }
      });
    } else {
      // Update existing settings
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          themeColor: parsed.data.themeColor,
          seoTitle: parsed.data.seoTitle,
          seoDescription: parsed.data.seoDescription
        }
      });
    }
    
    res.json({ message: "Settings updated", settings });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ message: "Failed to update settings", error });
  }
  return;
};