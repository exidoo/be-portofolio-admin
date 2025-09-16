import express from "express";
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// GET /api/experiences
router.get("/experiences", getAllExperiences);

// GET /api/experiences/:id
router.get("/experiences/:id", getExperienceById);

// POST /api/experiences
router.post("/experiences", verifyToken, createExperience);

// PUT /api/experiences/:id
router.put("/experiences/:id", verifyToken, updateExperience);

// DELETE /api/experiences/:id
router.delete("/experiences/:id", verifyToken, deleteExperience);

export default router;
