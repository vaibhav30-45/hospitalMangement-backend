import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { createVlog, deleteVlog, getVlogs } from "../controllers/vlogController.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getVlogs);

/* ADMIN */
router.post("/", adminAuth, createVlog);
router.delete("/:id", adminAuth, deleteVlog);

export default router;
