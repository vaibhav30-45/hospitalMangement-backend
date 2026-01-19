import express from "express";
import {
  adminSignup,
  adminLogin,
  getDashboardStats,
  getUpcomingAppointments
} from "../controllers/adminController.js";

const router = express.Router();

/* ADMIN AUTH ROUTES */
router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.get("/dashboard-stats", getDashboardStats);
router.get("/upcoming-appointments", getUpcomingAppointments);

export default router;