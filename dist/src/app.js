"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Routes
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const project_1 = __importDefault(require("./routes/project"));
const experience_1 = __importDefault(require("./routes/experience"));
const education_1 = __importDefault(require("./routes/education"));
const skill_1 = __importDefault(require("./routes/skill"));
const testimonial_1 = __importDefault(require("./routes/testimonial"));
const settings_1 = __importDefault(require("./routes/settings"));
const blog_1 = __importDefault(require("./routes/blog"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
// Gunakan hanya satu middleware untuk parsing JSON
app.use(express_1.default.json());
// Routes
app.use("/api", auth_1.default);
app.use("/api", profile_1.default);
app.use("/api", project_1.default);
app.use("/api", experience_1.default);
app.use("/api", education_1.default);
app.use("/api", skill_1.default);
app.use("/api", testimonial_1.default);
app.use("/api", settings_1.default);
app.use("/api", blog_1.default);
// Health Check
app.get("/", (req, res) => {
    res.send("Portofolio🚀");
});
exports.default = app;
