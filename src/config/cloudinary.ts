import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fungsi upload yang lebih robust
export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string
): Promise<string> => {
  try {
    console.log("Uploading to Cloudinary...", {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      folder,
    });

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `portfolio/${folder}`,
          resource_type: "auto",
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error("Failed to upload image to Cloudinary"));
          } else if (result) {
            console.log("Cloudinary upload success:", result.secure_url);
            resolve(result.secure_url);
          } else {
            reject(new Error("No result from Cloudinary"));
          }
        }
      );

      // Convert buffer to stream
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Error in uploadToCloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

// Fungsi delete
export const deleteFromCloudinary = async (url: string): Promise<void> => {
  try {
    const publicId = extractPublicIdFromUrl(url);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log("Deleted from Cloudinary:", publicId);
    }
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    // Jangan throw error karena delete tidak critical
  }
};

// Helper function untuk extract public ID
const extractPublicIdFromUrl = (url: string): string | null => {
  try {
    const matches = url.match(/\/v\d+\/(.+?)\./);
    return matches ? matches[1] : null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

export default cloudinary;
