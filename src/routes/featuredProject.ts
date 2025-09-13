import { Router } from "express";
import multer from "multer";
import { featuredProjectController } from "../controllers/featuredProjectController";
import verifyToken from "../middlewares/auth";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.get("/", featuredProjectController.getFeaturedProjects);
router.get("/:id", featuredProjectController.getFeaturedProjectById);

// Protected routes (require authentication)
router.post(
  "/",
  verifyToken,
  upload.single("thumbnail"),
  featuredProjectController.createFeaturedProject
);
router.put(
  "/:id",
  verifyToken,
  upload.single("thumbnail"),
  featuredProjectController.updateFeaturedProject
);
router.delete(
  "/:id",
  verifyToken,
  featuredProjectController.deleteFeaturedProject
);
router.patch(
  "/reorder",
  verifyToken,
  featuredProjectController.reorderFeaturedProjects
);

export default router;
