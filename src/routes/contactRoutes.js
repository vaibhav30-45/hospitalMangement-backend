import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  createContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Public Route (Frontend Contact Form)
router.post("/", createContact);

// Admin Routes
router.get("/", adminAuth, getAllContacts);
router.delete("/:id", adminAuth, deleteContact);

export default router;