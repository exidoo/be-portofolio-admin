// Express Tools
import { Request, Response } from "express";

// Prisma Tools
import { prisma } from "../../prisma/client";

// Validator
import {
  skillCreateSchema,
  skillUpdateSchema,
} from "../utils/validators/skillValidator";

export const getAllSkills = async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Failed to fetch skills", error });
  }
  return;
};

export const getSkillById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }

    res.json({ skill });
  } catch (error) {
    console.error("Error fetching skill:", error);
    res.status(500).json({ message: "Failed to fetch skill", error });
  }
  return;
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const parsed = skillCreateSchema.safeParse(req.body);

    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }

    const skill = await prisma.skill.create({
      data: parsed.data,
    });

    res.status(201).json({ message: "Skill created", skill });
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({ message: "Failed to create skill", error });
  }
  return;
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = skillUpdateSchema.safeParse(req.body);

    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.flatten() });
      return;
    }

    // Check if skill exists
    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }

    // Update skill
    const skill = await prisma.skill.update({
      where: { id },
      data: parsed.data,
    });

    res.json({ message: "Skill updated", skill });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ message: "Failed to update skill", error });
  }
  return;
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if skill exists
    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }

    // Delete skill
    await prisma.skill.delete({
      where: { id },
    });

    res.json({ message: "Skill deleted" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ message: "Failed to delete skill", error });
  }
  return;
};
