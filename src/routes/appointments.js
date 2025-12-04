import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  createAppointment,
  listAppointments,
  updateAppointmentStatus
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", verifyToken, createAppointment);
router.get("/", verifyToken, listAppointments);
router.put("/:id/status", verifyToken, updateAppointmentStatus);

export default router;
