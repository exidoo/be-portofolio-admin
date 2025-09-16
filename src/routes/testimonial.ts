import express from "express";
import { 
  getAllTestimonials, 
  getTestimonialById, 
  getApprovedTestimonials,
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial,
  uploadTestimonialImageMiddleware
} from "../controllers/testimonialController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// GET /api/testimonials (public endpoint for approved testimonials)
router.get("/approved", getApprovedTestimonials);

// GET /api/testimonials
router.get("/", getAllTestimonials);

// GET /api/testimonials/:id
router.get("/:id", getTestimonialById);

// POST /api/testimonials
router.post("/", verifyToken, uploadTestimonialImageMiddleware, createTestimonial);

// PUT /api/testimonials/:id
router.put("/:id", verifyToken, uploadTestimonialImageMiddleware, updateTestimonial);

// DELETE /api/testimonials/:id
router.delete("/:id", verifyToken, deleteTestimonial);

export default router;