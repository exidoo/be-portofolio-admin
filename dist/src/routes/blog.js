"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
// GET /api/blogs/published (public endpoint)
router.get("/published", blogController_1.getPublishedBlogs);
// GET /api/blogs/:id/published (public endpoint)
router.get("/:id/published", blogController_1.getPublishedBlogById);
// GET /api/blogs
router.get("/", blogController_1.getAllBlogs);
// GET /api/blogs/:id
router.get("/:id", blogController_1.getBlogById);
// POST /api/blogs
router.post("/", auth_1.default, blogController_1.uploadBlogImageMiddleware, blogController_1.createBlog);
// PUT /api/blogs/:id
router.put("/:id", auth_1.default, blogController_1.uploadBlogImageMiddleware, blogController_1.updateBlog);
// DELETE /api/blogs/:id
router.delete("/:id", auth_1.default, blogController_1.deleteBlog);
exports.default = router;
