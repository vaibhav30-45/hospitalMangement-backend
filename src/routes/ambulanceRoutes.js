import express from "express";
import { createAmbulanceBooking, getAllAmbulanceBookings, } from "../controllers/ambulanceController.js";

const router = express.Router();

// ✅ Frontend Booking API
router.post("/ambulanceBook", createAmbulanceBooking);

// ✅ Admin API
router.get("/ambulanceAll", getAllAmbulanceBookings);

export default router;