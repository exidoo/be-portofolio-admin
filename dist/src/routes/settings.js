"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settingsController_1 = require("../controllers/settingsController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
// GET /api/settings
router.get("/", settingsController_1.getSettings);
// PUT /api/settings
router.put("/", auth_1.default, settingsController_1.updateSettings);
exports.default = router;
