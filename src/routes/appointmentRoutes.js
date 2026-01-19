import express from "express";
import {bookAppointment, rescheduleAppointment,  getAllAppointments, updateAppointmentStatus} from "../controllers/AppointmentController.js";
import adminAuth from "../middleware/adminAuth.js";


const router = express.Router();

// Book
router.post("/book", bookAppointment);

// Reschedule
router.put("/reschedule/:appointmentId", rescheduleAppointment);

// Admin - Get All Appointments
router.get("/all", adminAuth, getAllAppointments);
router.put("/status/:id", adminAuth, updateAppointmentStatus);

export default router;