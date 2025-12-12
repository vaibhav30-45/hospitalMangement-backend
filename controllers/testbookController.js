import LabRequest from "../models/testbooking.js";

// Book Test
export const bookTest = async (req, res) => {
  try {
    const request = new LabRequest(req.body);
    const saved = await request.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings (admin/lab view)
export const getAllBookings = async (req, res) => {
  try {
    const data = await LabRequest.find()
      .populate("patientId")
      .populate("testId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
