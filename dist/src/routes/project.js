"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
// GET /api/projects
router.get("/projects", projectController_1.getAllProjects);
// GET /api/projects/:id
router.get("/projects/:id", projectController_1.getProjectById);
// POST /api/projects
router.post("/projects", auth_1.default, projectController_1.uploadProjectImageMiddleware, projectController_1.createProject);
// PUT /api/projects/:id
router.put("/projects/:id", auth_1.default, projectController_1.uploadProjectImageMiddleware, projectController_1.updateProject);
// DELETE /api/projects/:id
router.delete("/projects/:id", auth_1.default, projectController_1.deleteProject);
exports.default = router;
