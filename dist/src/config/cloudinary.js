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
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const stream_1 = require("stream");
dotenv_1.default.config();
// Konfigurasi Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Fungsi upload yang lebih robust
const uploadToCloudinary = (file, folder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Uploading to Cloudinary...", {
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            folder,
        });
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: `portfolio/${folder}`,
                resource_type: "auto",
                quality: "auto",
                fetch_format: "auto",
            }, (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(new Error("Failed to upload image to Cloudinary"));
                }
                else if (result) {
                    console.log("Cloudinary upload success:", result.secure_url);
                    resolve(result.secure_url);
                }
                else {
                    reject(new Error("No result from Cloudinary"));
                }
            });
            // Convert buffer to stream
            const readableStream = new stream_1.Readable();
            readableStream.push(file.buffer);
            readableStream.push(null);
            readableStream.pipe(uploadStream);
        });
    }
    catch (error) {
        console.error("Error in uploadToCloudinary:", error);
        throw new Error("Failed to upload image to Cloudinary");
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
// Fungsi delete
const deleteFromCloudinary = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicId = extractPublicIdFromUrl(url);
        if (publicId) {
            yield cloudinary_1.v2.uploader.destroy(publicId);
            console.log("Deleted from Cloudinary:", publicId);
        }
    }
    catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        // Jangan throw error karena delete tidak critical
    }
});
exports.deleteFromCloudinary = deleteFromCloudinary;
// Helper function untuk extract public ID
const extractPublicIdFromUrl = (url) => {
    try {
        const matches = url.match(/\/v\d+\/(.+?)\./);
        return matches ? matches[1] : null;
    }
    catch (error) {
        console.error("Error extracting public ID:", error);
        return null;
    }
};
exports.default = cloudinary_1.v2;
