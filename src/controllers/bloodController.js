import mongoose from 'mongoose';
import BloodInventory from '../models/bloodInventory.js';
import BloodRequest from '../models/bloodRequest.js';
import Donor from '../models/donor.js';

/**
 * Add or update inventory units for a blood group.
 * If inventory row doesn't exist, create it.
 * Only admin or blood_staff should call this.
 */
export const upsertInventory = async (req, res) => {
  try {
    const { bloodGroup, units, location } = req.body;
    if (!bloodGroup || typeof units !== 'number') {
      return res.status(400).json({ message: 'bloodGroup and numeric units required' });
    }

    const filter = { bloodGroup, location: location || null };
    const update = {
      $inc: { units },
      $set: { lastUpdated: new Date() }
    };

    // Use upsert to create if not exists
    const result = await BloodInventory.findOneAndUpdate(filter, update, { upsert: true, new: true, setDefaultsOnInsert: true });
    return res.json(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get current inventory (optionally filter by bloodGroup or location)
 */
export const getInventory = async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;
    const q = {};
    if (bloodGroup) q.bloodGroup = bloodGroup;
    if (location) q.location = location;
    const list = await BloodInventory.find(q).sort({ bloodGroup: 1 });
    return res.json(list);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Doctor creates a blood request on behalf of patient
 */
export const createRequest = async (req, res) => {
  try {
    const { patientId, bloodGroup, unitsRequested, reason } = req.body;
    const doctorId = req.user.id;

    if (!patientId || !bloodGroup || !unitsRequested) {
      return res.status(400).json({ message: 'patientId, bloodGroup and unitsRequested required' });
    }

    const reqDoc = await BloodRequest.create({
      patientId,
      doctorId,
      bloodGroup,
      unitsRequested,
      reason
    });

    return res.status(201).json(reqDoc);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * List requests (role-based):
 * - doctor: requests created by that doctor
 * - blood_staff/admin: all requests (or filter)
 * - patient: requests for that patient
 */
export const listRequests = async (req, res) => {
  try {
    const q = {};
    const user = req.user;

    if (user.role === 'doctor') q.doctorId = user.id;
    else if (user.role === 'patient') q.patientId = user.id;
    // blood_staff/admin see all (optionally accept query filters)
    if (req.query.status) q.status = req.query.status;

    const list = await BloodRequest.find(q).sort({ createdAt: -1 }).limit(200);
    return res.json(list);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Process request: approve/reject/issue
 * - approve: just set status to 'approved' and processedBy
 * - reject: set status to 'rejected'
 * - issue: atomically deduct units from inventory and set status 'issued', issuedAt
 *
 * Only admin or blood_staff should call this.
 */
export const processRequest = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const { action } = req.body; // 'approve' | 'reject' | 'issue'
    const userId = req.user.id;

    const reqDoc = await BloodRequest.findById(id).session(session);
    if (!reqDoc) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Request not found' });
    }
    if (reqDoc.status !== 'pending' && action !== 'approve' && action !== 'reject') {
      // prevent issuing non-pending unless approved (simple guard)
    }

    if (action === 'approve') {
      reqDoc.status = 'approved';
      reqDoc.processedBy = userId;
      reqDoc.updatedAt = new Date();
      await reqDoc.save({ session });
      await session.commitTransaction();
      session.endSession();
      return res.json(reqDoc);
    }

    if (action === 'reject') {
      reqDoc.status = 'rejected';
      reqDoc.processedBy = userId;
      reqDoc.updatedAt = new Date();
      await reqDoc.save({ session });
      await session.commitTransaction();
      session.endSession();
      return res.json(reqDoc);
    }

    if (action === 'issue') {
      // find inventory row (prefer location if provided in request or query)
      const { bloodGroup, unitsRequested } = reqDoc;
      const location = req.query.location || null;

      const filter = { bloodGroup, location };
      // attempt to decrement units atomically only if enough units available
      const inv = await BloodInventory.findOne(filter).session(session);
      if (!inv || inv.units < reqDoc.unitsRequested) {
        await session.abortTransaction();
        session.endSession();
        return res.status(409).json({ message: 'Insufficient units in inventory' });
      }

      inv.units -= reqDoc.unitsRequested;
      inv.lastUpdated = new Date();
      await inv.save({ session });

      reqDoc.status = 'issued';
      reqDoc.processedBy = userId;
      reqDoc.issuedAt = new Date();
      reqDoc.updatedAt = new Date();
      await reqDoc.save({ session });

      await session.commitTransaction();
      session.endSession();
      return res.json(reqDoc);
    }

    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ message: 'Invalid action' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Optional: add donor record (blood donation)
 */
export const addDonor = async (req, res) => {
  try {
    const payload = req.body;
    const d = await Donor.create(payload);
    return res.status(201).json(d);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
