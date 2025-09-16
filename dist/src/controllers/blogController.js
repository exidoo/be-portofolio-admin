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
exports.uploadBlogImageMiddleware = exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getPublishedBlogById = exports.getBlogById = exports.getPublishedBlogs = exports.getAllBlogs = void 0;
// Prisma Tools
const client_1 = __importDefault(require("../../prisma/client"));
// Validator
const blogValidator_1 = require("../utils/validators/blogValidator");
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
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield client_1.default.blog.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json({ blogs });
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Failed to fetch blogs", error });
    }
    return;
});
exports.getAllBlogs = getAllBlogs;
const getPublishedBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield client_1.default.blog.findMany({
            where: {
                published: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json({ blogs });
    }
    catch (error) {
        console.error("Error fetching published blogs:", error);
        res.status(500).json({ message: "Failed to fetch published blogs", error });
    }
    return;
});
exports.getPublishedBlogs = getPublishedBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield client_1.default.blog.findUnique({
            where: { id },
        });
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        res.json({ blog });
    }
    catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "Failed to fetch blog", error });
    }
    return;
});
exports.getBlogById = getBlogById;
const getPublishedBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield client_1.default.blog.findUnique({
            where: {
                id,
                published: true,
            },
        });
        if (!blog) {
            res.status(404).json({ message: "Blog not found or not published" });
            return;
        }
        res.json({ blog });
    }
    catch (error) {
        console.error("Error fetching published blog:", error);
        res.status(500).json({ message: "Failed to fetch published blog", error });
    }
    return;
});
exports.getPublishedBlogById = getPublishedBlogById;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = blogValidator_1.blogCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        let imageUrl = null;
        // Handle image upload
        if (req.file) {
            imageUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file, "blogs");
        }
        const blog = yield client_1.default.blog.create({
            data: Object.assign(Object.assign({}, parsed.data), (imageUrl && { image: imageUrl })),
        });
        res.status(201).json({ message: "Blog created", blog });
    }
    catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Failed to create blog", error });
    }
    return;
});
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsed = blogValidator_1.blogUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        // Check if blog exists
        const existingBlog = yield client_1.default.blog.findUnique({
            where: { id },
        });
        if (!existingBlog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        let imageUrl = null;
        // Handle image upload
        if (req.file) {
            imageUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file, "blogs");
            // Delete old image from Cloudinary if exists
            if (existingBlog.image) {
                yield (0, cloudinary_1.deleteFromCloudinary)(existingBlog.image);
            }
        }
        // Update blog
        const blog = yield client_1.default.blog.update({
            where: { id },
            data: Object.assign(Object.assign({}, parsed.data), (imageUrl && { image: imageUrl })),
        });
        res.json({ message: "Blog updated", blog });
    }
    catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Failed to update blog", error });
    }
    return;
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if blog exists
        const existingBlog = yield client_1.default.blog.findUnique({
            where: { id },
        });
        if (!existingBlog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        // Delete image from Cloudinary if exists
        if (existingBlog.image) {
            yield (0, cloudinary_1.deleteFromCloudinary)(existingBlog.image);
        }
        // Delete blog
        yield client_1.default.blog.delete({
            where: { id },
        });
        res.json({ message: "Blog deleted" });
    }
    catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Failed to delete blog", error });
    }
    return;
});
exports.deleteBlog = deleteBlog;
// Export upload middleware
exports.uploadBlogImageMiddleware = upload.single("image");
