import express from "express";
import { rescheduleAppointment } from "../controllers/rescheduleAppointmentController.js";

const router = express.Router();

router.put("/reschedule/:appointmentId", rescheduleAppointment);

export default router;

