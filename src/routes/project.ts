import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImageMiddleware,
} from "../controllers/projectController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// GET /api/projects
router.get("/projects", getAllProjects);

// GET /api/projects/:id
router.get("/projects/:id", getProjectById);

// POST /api/projects
router.post(
  "/projects",
  verifyToken,
  uploadProjectImageMiddleware,
  createProject
);

// PUT /api/projects/:id
router.put(
  "/projects/:id",
  verifyToken,
  uploadProjectImageMiddleware,
  updateProject
);

// DELETE /api/projects/:id
router.delete("/projects/:id", verifyToken, deleteProject);

export default router;
