import express from "express";
import { registerPatient, loginPatient, getProfile, updateProfile } from "../controllers/patientController.js";

const router = express.Router();

router.post("/register", registerPatient);
router.post("/login", loginPatient);
router.get("/profile/:id", getProfile);
router.put("/update/:id", updateProfile);

export default router;




