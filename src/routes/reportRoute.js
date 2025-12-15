import express from "express";
import { uploadReport, getReports } from "../controllers/reportController.js";

const router = express.Router();

router.post("/upload", uploadReport);
router.get("/patient/:id", getReports);

export default router;
