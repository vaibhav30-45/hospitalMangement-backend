import express from "express";
import { createAmbulanceBooking, getAllAmbulanceBookings, } from "../controllers/ambulanceController.js";

const router = express.Router();

// ✅ Frontend Booking API
router.post("/ambulance", createAmbulanceBooking);

// ✅ Admin API
router.get("/ambulance", getAllAmbulanceBookings);

export default router;