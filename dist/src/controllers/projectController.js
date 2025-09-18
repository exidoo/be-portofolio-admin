"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProjectImageMiddleware = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
// Prisma Tools
const client_1 = require("../../prisma/client");
// Validator
const projectValidator_1 = require("../utils/validators/projectValidator");
// Cloudinary
const cloudinary_1 = require("../config/cloudinary");
// Middleware untuk upload file
const multer_1 = __importDefault(require("multer"));
// Setup multer untuk upload file
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files are allowed!"), false);
        }
    },
});
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield client_1.prisma.project.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json({ projects });
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Failed to fetch projects", error });
    }
    return;
});
exports.getAllProjects = getAllProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield client_1.prisma.project.findUnique({
            where: { id },
        });
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.json({ project });
    }
    catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Failed to fetch project", error });
    }
    return;
});
exports.getProjectById = getProjectById;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Convert technologies ke array kalau dikirim sebagai string
        if (req.body.technologies) {
            try {
                req.body.technologies = JSON.parse(req.body.technologies);
            }
            catch (_a) {
                req.body.technologies = req.body.technologies
                    .split(",")
                    .map((t) => t.trim());
            }
        }
        const parsed = projectValidator_1.projectCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        let imageUrl = "";
        if (req.file) {
            imageUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file, "projects");
        }
        const project = yield client_1.prisma.project.create({
            data: Object.assign(Object.assign({}, parsed.data), { image: imageUrl }),
        });
        res.status(201).json({ message: "Project created", project });
    }
    catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Failed to create project", error });
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Convert technologies ke array kalau dikirim sebagai string
        if (req.body.technologies) {
            try {
                req.body.technologies = JSON.parse(req.body.technologies);
            }
            catch (_a) {
                req.body.technologies = req.body.technologies
                    .split(",")
                    .map((t) => t.trim());
            }
        }
        const parsed = projectValidator_1.projectUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        // Check if project exists
        const existingProject = yield client_1.prisma.project.findUnique({
            where: { id },
        });
        if (!existingProject) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        let imageUrl = existingProject.image;
        // Handle image upload
        if (req.file) {
            imageUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file, "projects");
            // Delete old image from Cloudinary if exists
            if (existingProject.image) {
                yield (0, cloudinary_1.deleteFromCloudinary)(existingProject.image);
            }
        }
        // Update project
        const project = yield client_1.prisma.project.update({
            where: { id },
            data: Object.assign(Object.assign({}, parsed.data), { image: imageUrl }),
        });
        res.json({ message: "Project updated", project });
    }
    catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Failed to update project", error });
    }
    return;
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if project exists
        const existingProject = yield client_1.prisma.project.findUnique({
            where: { id },
        });
        if (!existingProject) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        // Delete image from Cloudinary if exists
        if (existingProject.image) {
            yield (0, cloudinary_1.deleteFromCloudinary)(existingProject.image);
        }
        // Delete project
        yield client_1.prisma.project.delete({
            where: { id },
        });
        res.json({ message: "Project deleted" });
    }
    catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Failed to delete project", error });
    }
    return;
});
exports.deleteProject = deleteProject;
// Export upload middleware
exports.uploadProjectImageMiddleware = upload.single("image");
