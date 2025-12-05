import express from "express";
import {
  createContact,
  getAllContacts,
} from "../controllers/contactController.js";

const router = express.Router();

// Public Route (Frontend Contact Form)
router.post("/contact", createContact);

// Admin Route (Get All Contact Messages)
router.get("/contact", getAllContacts);

export default router;