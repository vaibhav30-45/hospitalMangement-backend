import express from "express";
import verifyToken from "../middleware/auth.js";
import { createDoctor, listDoctors, getDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/", verifyToken, createDoctor);
router.get("/", verifyToken, listDoctors);
router.get("/:id", verifyToken, getDoctor);

export default router;