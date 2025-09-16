// Express Tools
import { Request, Response } from "express";

// Prisma Tools
import prisma from "../../prisma/client";

// Validator
import { experienceCreateSchema, experienceUpdateSchema } from "../utils/validators/experienceValidator";

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        startDate: 'desc'
      }
    });
    
    res.json({ experiences });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Failed to fetch experiences", error });
  }
  return;
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const experience = await prisma.experience.findUnique({
      where: { id }
    });
    
    if (!experience) {
      res.status(404).json({ message: "Experience not found" });
      return;
    }
    
    res.json({ experience });
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ message: "Failed to fetch experience", error });
  }
  return;
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const parsed = experienceCreateSchema.safeParse(req.body);
    
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }
    
    const experience = await prisma.experience.create({
      data: parsed.data
    });
    
    res.status(201).json({ message: "Experience created", experience });
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ message: "Failed to create experience", error });
  }
  return;
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = experienceUpdateSchema.safeParse(req.body);
    
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }
    
    // Check if experience exists
    const existingExperience = await prisma.experience.findUnique({
      where: { id }
    });
    
    if (!existingExperience) {
      res.status(404).json({ message: "Experience not found" });
      return;
    }
    
    // Update experience
    const experience = await prisma.experience.update({
      where: { id },
      data: parsed.data
    });
    
    res.json({ message: "Experience updated", experience });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Failed to update experience", error });
  }
  return;
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if experience exists
    const existingExperience = await prisma.experience.findUnique({
      where: { id }
    });
    
    if (!existingExperience) {
      res.status(404).json({ message: "Experience not found" });
      return;
    }
    
    // Delete experience
    await prisma.experience.delete({
      where: { id }
    });
    
    res.json({ message: "Experience deleted" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: "Failed to delete experience", error });
  }
  return;
};