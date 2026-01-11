import Doctor from "../models/Doctor.js";

/* Add Doctor (Admin) */
export const addDoctor = async (req, res) => {
  try {
    const { name, title, contact, image } = req.body;

    if (!name || !title || !contact || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doctor = new Doctor({ name, title, contact, image });
    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*  Get All Doctors (Frontend + Admin) */
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*  Delete Doctor (Admin) */
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};