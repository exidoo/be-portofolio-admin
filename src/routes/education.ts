import express from "express";
import {
  getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// GET /api/educations
router.get("/education", getAllEducations);

// GET /api/educations/:id
router.get("/education/:id", getEducationById);

// POST /api/educations
router.post("/education", verifyToken, createEducation);

// PUT /api/educations/:id
router.put("/education/:id", verifyToken, updateEducation);

// DELETE /api/educations/:id
router.delete("/education/:id", verifyToken, deleteEducation);

export default router;
