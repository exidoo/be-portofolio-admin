"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../controllers/profileController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
// GET /api/profiles
router.get("/", auth_1.default, profileController_1.getAllProfiles);
// GET /api/profile
router.get("/me", auth_1.default, profileController_1.getProfile);
// POST /api/profile
router.post("/", auth_1.default, profileController_1.uploadProfileImageMiddleware, profileController_1.createProfile);
// PUT /api/profile
router.put("/", auth_1.default, profileController_1.uploadProfileImageMiddleware, profileController_1.updateProfile);
// DELETE /api/profile
router.delete("/", auth_1.default, profileController_1.deleteProfile);
exports.default = router;
