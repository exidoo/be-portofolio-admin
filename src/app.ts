// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth";
import homeRoutes from "./routes/home";
import featuredProjectRoutes from "./routes/featuredProject";

dotenv.config();

const app = express();

// Middleware
app.use(cors());

// Gunakan hanya satu middleware untuk parsing JSON
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", homeRoutes);
app.use("/api", featuredProjectRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Portofolio🚀");
});

export default app;
