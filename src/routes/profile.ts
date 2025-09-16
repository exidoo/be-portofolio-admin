import express from "express";
import {
  getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  uploadProfileImageMiddleware,
} from "../controllers/profileController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// GET /api/profiles
router.get("/profile", getAllProfiles);

// GET /api/profile
router.get("/me/:id", getProfile);

// POST /api/profile
router.post(
  "/profile",
  verifyToken,
  uploadProfileImageMiddleware,
  createProfile
);

// PUT /api/profile
router.put(
  "/profile/:id",
  verifyToken,
  uploadProfileImageMiddleware,
  updateProfile
);

// DELETE /api/profile
router.delete("/profile/:id", verifyToken, deleteProfile);

export default router;
