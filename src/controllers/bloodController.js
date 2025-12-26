import Blood from '../models/bloodInventory.js';
import Donor from '../models/donor.js';

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


/* ADMIN DONOR */
export const addDonor = async (req, res) => {
  res.json(await Donor.create(req.body));
};

export const getDonors = async (req, res) => {
  res.json(await Donor.find());
};