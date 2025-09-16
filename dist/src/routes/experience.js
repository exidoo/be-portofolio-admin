"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const experienceController_1 = require("../controllers/experienceController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
// GET /api/experiences
router.get("/experiences", experienceController_1.getAllExperiences);
// GET /api/experiences/:id
router.get("/experiences/:id", experienceController_1.getExperienceById);
// POST /api/experiences
router.post("/experiences", auth_1.default, experienceController_1.createExperience);
// PUT /api/experiences/:id
router.put("/experiences/:id", auth_1.default, experienceController_1.updateExperience);
// DELETE /api/experiences/:id
router.delete("/experiences/:id", auth_1.default, experienceController_1.deleteExperience);
exports.default = router;
