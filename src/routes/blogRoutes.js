import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

/* ADMIN */
router.post("/", adminAuth, createBlog);
router.put("/:id", adminAuth, updateBlog); 
router.delete("/:id", adminAuth, deleteBlog);

export default router;