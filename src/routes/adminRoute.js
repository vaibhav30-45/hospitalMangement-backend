import express from "express";
import {
  adminSignup,
  adminLogin
} from "../controllers/adminController.js";

const router = express.Router();

/* ADMIN AUTH ROUTES */
router.post("/signup", adminSignup);
router.post("/login", adminLogin);

export default router;
