import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import {
  updateBlood,
  getBloodAvailability,
  addDonor,
  getDonors
} from '../controllers/bloodController.js';

const router = express.Router();

/* PUBLIC */
router.get("/", getBloodAvailability);

/* ADMIN */
router.post("/update", adminAuth, updateBlood);
router.post("/donor", adminAuth, addDonor);
router.get("/donor", adminAuth, getDonors);


export default router;