// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import projectRoutes from "./routes/project";
import experienceRoutes from "./routes/experience";
import educationRoutes from "./routes/education";
import skillRoutes from "./routes/skill";
import testimonialRoutes from "./routes/testimonial";
import settingsRoutes from "./routes/settings";
import blogRoutes from "./routes/blog";

dotenv.config();

const app = express();

// Middleware
app.use(cors());

// Gunakan hanya satu middleware untuk parsing JSON
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", projectRoutes);
app.use("/api", experienceRoutes);
app.use("/api", educationRoutes);
app.use("/api", skillRoutes);
app.use("/api", testimonialRoutes);
app.use("/api", settingsRoutes);
app.use("/api", blogRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Portofolio🚀");
});

export default app;
