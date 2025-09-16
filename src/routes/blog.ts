import express from "express";
import { 
  getAllBlogs, 
  getPublishedBlogs,
  getBlogById, 
  getPublishedBlogById,
  createBlog, 
  updateBlog, 
  deleteBlog,
  uploadBlogImageMiddleware
} from "../controllers/blogController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

// GET /api/blogs/published (public endpoint)
router.get("/published", getPublishedBlogs);

// GET /api/blogs/:id/published (public endpoint)
router.get("/:id/published", getPublishedBlogById);

// GET /api/blogs
router.get("/", getAllBlogs);

// GET /api/blogs/:id
router.get("/:id", getBlogById);

// POST /api/blogs
router.post("/", verifyToken, uploadBlogImageMiddleware, createBlog);

// PUT /api/blogs/:id
router.put("/:id", verifyToken, uploadBlogImageMiddleware, updateBlog);

// DELETE /api/blogs/:id
router.delete("/:id", verifyToken, deleteBlog);

export default router;