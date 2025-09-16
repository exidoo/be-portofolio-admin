import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// GET /api/settings
router.get("/", getSettings);

// PUT /api/settings
router.put("/", verifyToken, updateSettings);

export default router;