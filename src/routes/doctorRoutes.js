import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  addDoctor,
  getAllDoctors,
  deleteDoctor,
  updateDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

/* Admin */
router.post("/add", adminAuth, addDoctor);
router.delete("/delete/:id", adminAuth, deleteDoctor);
router.put("/update/:id", adminAuth, updateDoctor);

/* Public */
router.get("/", getAllDoctors);

export default router;
