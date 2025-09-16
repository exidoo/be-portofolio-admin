import express from "express";
import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// GET /api/skills
router.get("/skills", getAllSkills);

// GET /api/skills/:id
router.get("/skills/:id", getSkillById);

// POST /api/skills
router.post("/skills", verifyToken, createSkill);

// PUT /api/skills/:id
router.put("/skills/:id", verifyToken, updateSkill);

// DELETE /api/skills/:id
router.delete("/skills/:id", verifyToken, deleteSkill);

export default router;
