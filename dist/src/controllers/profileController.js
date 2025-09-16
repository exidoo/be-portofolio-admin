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
exports.uploadProfileImageMiddleware = exports.deleteProfile = exports.updateProfile = exports.createProfile = exports.getProfile = exports.getAllProfiles = void 0;
// Prisma Tools
const client_1 = __importDefault(require("../../prisma/client"));
// Validator
const profileValidator_1 = require("../utils/validators/profileValidator");
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
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});
const getAllProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield client_1.default.profile.findMany({
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });
        res.json({ profiles });
    }
    catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).json({ message: "Failed to fetch profiles", error });
    }
    return;
});
exports.getAllProfiles = getAllProfiles;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const profile = yield client_1.default.profile.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        res.json({ profile });
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Failed to fetch profile", error });
    }
    return;
});
exports.getProfile = getProfile;
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const parsed = profileValidator_1.profileCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        // Check if profile already exists
        const existingProfile = yield client_1.default.profile.findUnique({
            where: { userId }
        });
        if (existingProfile) {
            res.status(400).json({ message: "Profile already exists" });
            return;
        }
        let imageUrl = null;
        // Handle image upload
        if (req.file) {
            imageUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file, "profile");
        }
        const profile = yield client_1.default.profile.create({
            data: Object.assign(Object.assign({ userId }, parsed.data), (imageUrl && { image: imageUrl }))
        });
        res.status(201).json({ message: "Profile created", profile });
    }
    catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ message: "Failed to create profile", error });
    }
    return;
});
exports.createProfile = createProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const parsed = profileValidator_1.profileUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        // Check if profile exists
        const existingProfile = yield client_1.default.profile.findUnique({
            where: { userId }
        });
        if (!existingProfile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        let imageUrl = null;
        // Handle image upload
        if (req.file) {
            imageUrl = yield (0, cloudinary_1.uploadToCloudinary)(req.file, "profile");
            // Delete old image from Cloudinary if exists
            if (existingProfile.image) {
                yield (0, cloudinary_1.deleteFromCloudinary)(existingProfile.image);
            }
        }
        const profile = yield client_1.default.profile.update({
            where: { userId },
            data: Object.assign(Object.assign({}, parsed.data), (imageUrl && { image: imageUrl }))
        });
        res.json({ message: "Profile updated", profile });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile", error });
    }
    return;
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        // Check if profile exists
        const existingProfile = yield client_1.default.profile.findUnique({
            where: { userId }
        });
        if (!existingProfile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        // Delete image from Cloudinary if exists
        if (existingProfile.image) {
            yield (0, cloudinary_1.deleteFromCloudinary)(existingProfile.image);
        }
        // Delete profile
        yield client_1.default.profile.delete({
            where: { userId }
        });
        res.json({ message: "Profile deleted" });
    }
    catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({ message: "Failed to delete profile", error });
    }
    return;
});
exports.deleteProfile = deleteProfile;
// Export upload middleware
exports.uploadProfileImageMiddleware = upload.single('image');
