import Appointment from "../models/appointment.js";

export const bookAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const list = await Appointment.find({ patientId: req.params.id });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
