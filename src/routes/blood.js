import express from 'express';
import verifyToken from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import {
  upsertInventory,
  getInventory,
  createRequest,
  listRequests,
  processRequest,
  addDonor
} from '../controllers/bloodController.js';

const router = express.Router();

/**
 * Inventory endpoints
 * - upsertInventory: add/remove units (admin or blood_staff)
 * - getInventory: anyone authenticated can view (doctors/patients can view)
 */
router.post('/inventory', verifyToken, authorize(['admin','blood_staff']), upsertInventory);
router.get('/inventory', verifyToken, getInventory);

/**
 * Blood requests
 * - doctor creates request
 * - list: doctor/patient/blood_staff/admin see filtered lists
 * - process request: approve/reject/issue (admin/blood_staff)
 */
router.post('/request', verifyToken, authorize(['doctor']), createRequest);
router.get('/requests', verifyToken, listRequests);
router.put('/request/:id/process', verifyToken, authorize(['admin','blood_staff']), processRequest);


//  Donor

router.post('/donor', verifyToken, authorize(['admin','blood_staff']), addDonor);

export default router;