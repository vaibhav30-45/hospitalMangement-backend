import Blood from '../models/bloodInventory.js';
import Donor from '../models/donor.js';
import BloodRequest from '../models/BloodRequest.js';

/* ADMIN */
export const updateBlood = async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;

    if (!bloodGroup || units === undefined) {
      return res.status(400).json({
        message: "bloodGroup and units are required"
      });
    }

    const blood = await Blood.findOneAndUpdate(
      { bloodGroup },
      {
        units,
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json(blood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* PUBLIC */
export const getBloodAvailability = async (req, res) => {
  res.json(await Blood.find());
};

export const createBloodRequest = async (req, res) => {
  try {
    const { name, bloodGroup, units, contact, urgency } = req.body;

    if (!name || !bloodGroup || !units || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }


    // ✅ Contact number validation (10 digits only)
    const contactRegex = /^[6-9]\d{9}$/;

    if (!contactRegex.test(contact)) {
      return res.status(400).json({
        message: "Contact number must be a valid 10-digit Indian mobile number"
      });
    }

    const inventory = await Blood.findOne({ bloodGroup });

    if (!inventory || inventory.units === 0) {
      return res
        .status(400)
        .json({ message: "Blood not available" });
    }

    if (inventory.units < units) {
      return res.status(400).json({
        message: `Only ${inventory.units} units available`,
      });
    }

    // Save request
    const request = await BloodRequest.create({
      patientName: name,
      bloodGroup,
      units,
      contact,
      urgency,
    });

    // Deduct inventory
    inventory.units -= units;
    inventory.lastUpdated = new Date();
    await inventory.save();

    res.status(201).json({
      message: "Blood request approved",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ADMIN */
export const getAllBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Public DONOR */
export const addDonor = async (req, res) => {
  res.json(await Donor.create(req.body));
};

/* ADMIN */
export const getDonors = async (req, res) => {
  res.json(await Donor.find());
};