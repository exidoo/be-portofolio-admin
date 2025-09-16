// Express Tools
import { Request, Response } from "express";

// Prisma Tools
import prisma from "../../prisma/client";

// Validator
import { educationCreateSchema, educationUpdateSchema } from "../utils/validators/educationValidator";

export const getAllEducations = async (req: Request, res: Response) => {
  try {
    const educations = await prisma.education.findMany({
      orderBy: {
        startDate: 'desc'
      }
    });
    
    res.json({ educations });
  } catch (error) {
    console.error("Error fetching educations:", error);
    res.status(500).json({ message: "Failed to fetch educations", error });
  }
  return;
};

export const getEducationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const education = await prisma.education.findUnique({
      where: { id }
    });
    
    if (!education) {
      res.status(404).json({ message: "Education not found" });
      return;
    }
    
    res.json({ education });
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ message: "Failed to fetch education", error });
  }
  return;
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const parsed = educationCreateSchema.safeParse(req.body);
    
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }
    
    const education = await prisma.education.create({
      data: parsed.data
    });
    
    res.status(201).json({ message: "Education created", education });
  } catch (error) {
    console.error("Error creating education:", error);
    res.status(500).json({ message: "Failed to create education", error });
  }
  return;
};

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = educationUpdateSchema.safeParse(req.body);
    
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }
    
    // Check if education exists
    const existingEducation = await prisma.education.findUnique({
      where: { id }
    });
    
    if (!existingEducation) {
      res.status(404).json({ message: "Education not found" });
      return;
    }
    
    // Update education
    const education = await prisma.education.update({
      where: { id },
      data: parsed.data
    });
    
    res.json({ message: "Education updated", education });
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ message: "Failed to update education", error });
  }
  return;
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if education exists
    const existingEducation = await prisma.education.findUnique({
      where: { id }
    });
    
    if (!existingEducation) {
      res.status(404).json({ message: "Education not found" });
      return;
    }
    
    // Delete education
    await prisma.education.delete({
      where: { id }
    });
    
    res.json({ message: "Education deleted" });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ message: "Failed to delete education", error });
  }
  return;
};