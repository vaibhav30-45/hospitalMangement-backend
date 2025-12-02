import express from "express";
import auth from "../middleware/auth.js";
import {
  createAppointment,
  listAppointments,
  updateAppointmentStatus
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", auth, createAppointment);
router.get("/", auth, listAppointments);
router.put("/:id/status", auth, updateAppointmentStatus);

export default router;
