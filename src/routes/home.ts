import { Router } from "express";
import multer from "multer";
import { homeController } from "../controllers/homeControllers";
import verifyToken from "../middlewares/auth";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
verifyToken;
// Public routes
router.get("/home", homeController.getHome);

// Protected routes (require authentication)
router.post(
  "/home",
  verifyToken,
  upload.single("heroImage"),
  homeController.createHome
);
router.put(
  "/home/:id",
  verifyToken,
  upload.single("heroImage"),
  homeController.updateHome
);
router.delete("/home/:id", verifyToken, homeController.deleteHome);

export default router;
