import express from "express";
import {
  bookAppointment,
  rescheduleAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book", bookAppointment);
router.put("/reschedule/:id", rescheduleAppointment);

export default router;
