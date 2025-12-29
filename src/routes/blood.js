import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import {
  updateBlood,
  getBloodAvailability,
  createBloodRequest,
  getAllBloodRequests,
  addDonor,
  getDonors
} from '../controllers/bloodController.js';

const router = express.Router();

/* PUBLIC */
router.get("/", getBloodAvailability);
router.post("/request", createBloodRequest);
router.post("/AddDonor", addDonor);

/* ADMIN */
router.post("/update", adminAuth, updateBlood);
router.get("/requests", adminAuth, getAllBloodRequests);
router.get("/donor", adminAuth, getDonors);


export default router;