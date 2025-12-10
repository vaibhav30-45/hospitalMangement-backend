import express from "express";
import { addTest, getTests } from "../controllers/testController.js";

const router = express.Router();

router.post("/add", addTest);
router.get("/all", getTests);

export default router;
