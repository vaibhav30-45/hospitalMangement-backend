import express from "express";
import auth from "../middleware/auth.js";
import { createDoctor, listDoctors, getDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/", auth, createDoctor);
router.get("/", auth, listDoctors);
router.get("/:id", auth, getDoctor);

export default router;