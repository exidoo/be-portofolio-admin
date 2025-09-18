"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skillController_1 = require("../controllers/skillController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
// GET /api/skills
router.get("/skills", skillController_1.getAllSkills);
// GET /api/skills/:id
router.get("/skills/:id", skillController_1.getSkillById);
// POST /api/skills
router.post("/skills", auth_1.default, skillController_1.createSkill);
// PUT /api/skills/:id
router.put("/skills/:id", auth_1.default, skillController_1.updateSkill);
// DELETE /api/skills/:id
router.delete("/skills/:id", auth_1.default, skillController_1.deleteSkill);
exports.default = router;
