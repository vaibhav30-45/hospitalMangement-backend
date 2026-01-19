import express from "express";
import { bookTest, getAllBookings } from "../controllers/testbookController.js";

const router = express.Router();

router.post("/book", bookTest);
router.get("/all", getAllBookings);

export default router;
