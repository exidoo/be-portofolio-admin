"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const educationController_1 = require("../controllers/educationController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
// GET /api/educations
router.get("/education", educationController_1.getAllEducations);
// GET /api/educations/:id
router.get("/education/:id", educationController_1.getEducationById);
// POST /api/educations
router.post("/education", auth_1.default, educationController_1.createEducation);
// PUT /api/educations/:id
router.put("/education/:id", auth_1.default, educationController_1.updateEducation);
// DELETE /api/educations/:id
router.delete("/education/:id", auth_1.default, educationController_1.deleteEducation);
exports.default = router;
