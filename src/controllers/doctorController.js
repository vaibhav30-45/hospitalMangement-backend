import doctor from '../models/doctor.js';

export const createDoctor = async (req, res) => {
  try {
    const d = await doctor.create(req.body);
    res.status(201).json(d);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listDoctors = async (req, res) => {
  try {
    const list = await doctor.find();
    res.json(list);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const doc = await doctor.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Doctor not found" });

    res.json(doc);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};