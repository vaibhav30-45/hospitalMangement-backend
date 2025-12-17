import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerPatient = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const patient = new Patient({ ...req.body, password: hashed });
    const saved = await patient.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginPatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.body.email });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const valid = await bcrypt.compare(req.body.password, patient.password);
    if (!valid) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: patient._id }, process.env.JWT_Secret, { expiresIn: "7d" });

    res.json({ token, patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



