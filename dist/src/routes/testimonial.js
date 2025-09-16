"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testimonialController_1 = require("../controllers/testimonialController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
// GET /api/testimonials (public endpoint for approved testimonials)
router.get("/approved", testimonialController_1.getApprovedTestimonials);
// GET /api/testimonials
router.get("/", testimonialController_1.getAllTestimonials);
// GET /api/testimonials/:id
router.get("/:id", testimonialController_1.getTestimonialById);
// POST /api/testimonials
router.post("/", auth_1.default, testimonialController_1.uploadTestimonialImageMiddleware, testimonialController_1.createTestimonial);
// PUT /api/testimonials/:id
router.put("/:id", auth_1.default, testimonialController_1.uploadTestimonialImageMiddleware, testimonialController_1.updateTestimonial);
// DELETE /api/testimonials/:id
router.delete("/:id", auth_1.default, testimonialController_1.deleteTestimonial);
exports.default = router;
