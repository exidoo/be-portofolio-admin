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
exports.uploadTestimonialImageMiddleware = exports.deleteTestimonial = exports.updateTestimonial = exports.createTestimonial = exports.getApprovedTestimonials = exports.getTestimonialById = exports.getAllTestimonials = void 0;
// Prisma Tools
const client_1 = require("../../prisma/client");
// Validator
const testimonialValidator_1 = require("../utils/validators/testimonialValidator");
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
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files are allowed!"), false);
        }
    },
});
const getAllTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield client_1.prisma.testimonial.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json({ testimonials });
    }
    catch (error) {
        console.error("Error fetching testimonials:", error);
        res.status(500).json({ message: "Failed to fetch testimonials", error });
    }
    return;
});
exports.getAllTestimonials = getAllTestimonials;
const getTestimonialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const testimonial = yield client_1.prisma.testimonial.findUnique({
            where: { id },
        });
        if (!testimonial) {
            res.status(404).json({ message: "Testimonial not found" });
            return;
        }
        res.json({ testimonial });
    }
    catch (error) {
        console.error("Error fetching testimonial:", error);
        res.status(500).json({ message: "Failed to fetch testimonial", error });
    }
    return;
});
exports.getTestimonialById = getTestimonialById;
const getApprovedTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield client_1.prisma.testimonial.findMany({
            where: {
                approved: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json({ testimonials });
    }
    catch (error) {
        console.error("Error fetching approved testimonials:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch approved testimonials", error });
    }
    return;
});
exports.getApprovedTestimonials = getApprovedTestimonials;
const createTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsed = testimonialValidator_1.testimonialCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        let imageUrl = null;
        // Handle image upload
        if (req.file) {
            imageUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file, "testimonials");
        }
        const testimonial = yield client_1.prisma.testimonial.create({
            data: Object.assign(Object.assign(Object.assign({}, parsed.data), (imageUrl && { image: imageUrl })), { 
                // Default to not approved
                approved: (_a = parsed.data.approved) !== null && _a !== void 0 ? _a : false }),
        });
        res.status(201).json({ message: "Testimonial created", testimonial });
    }
    catch (error) {
        console.error("Error creating testimonial:", error);
        res.status(500).json({ message: "Failed to create testimonial", error });
    }
    return;
});
exports.createTestimonial = createTestimonial;
const updateTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsed = testimonialValidator_1.testimonialUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        // Check if testimonial exists
        const existingTestimonial = yield client_1.prisma.testimonial.findUnique({
            where: { id },
        });
        if (!existingTestimonial) {
            res.status(404).json({ message: "Testimonial not found" });
            return;
        }
        let imageUrl = null;
        // Handle image upload
        if (req.file) {
            imageUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file, "testimonials");
            // Delete old image from Cloudinary if exists
            if (existingTestimonial.image) {
                yield (0, cloudinary_1.deleteFromCloudinary)(existingTestimonial.image);
            }
        }
        // Update testimonial
        const testimonial = yield client_1.prisma.testimonial.update({
            where: { id },
            data: Object.assign(Object.assign({}, parsed.data), (imageUrl && { image: imageUrl })),
        });
        res.json({ message: "Testimonial updated", testimonial });
    }
    catch (error) {
        console.error("Error updating testimonial:", error);
        res.status(500).json({ message: "Failed to update testimonial", error });
    }
    return;
});
exports.updateTestimonial = updateTestimonial;
const deleteTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if testimonial exists
        const existingTestimonial = yield client_1.prisma.testimonial.findUnique({
            where: { id },
        });
        if (!existingTestimonial) {
            res.status(404).json({ message: "Testimonial not found" });
            return;
        }
        // Delete image from Cloudinary if exists
        if (existingTestimonial.image) {
            yield (0, cloudinary_1.deleteFromCloudinary)(existingTestimonial.image);
        }
        // Delete testimonial
        yield client_1.prisma.testimonial.delete({
            where: { id },
        });
        res.json({ message: "Testimonial deleted" });
    }
    catch (error) {
        console.error("Error deleting testimonial:", error);
        res.status(500).json({ message: "Failed to delete testimonial", error });
    }
    return;
});
exports.deleteTestimonial = deleteTestimonial;
// Export upload middleware
exports.uploadTestimonialImageMiddleware = upload.single("image");
