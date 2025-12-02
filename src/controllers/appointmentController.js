import Appointment from "../models/appointment.js";

export const createAppointment = async (req, res) => {
  const { doctorId, date, startTime, endTime, reason } = req.body;
  const patientId = req.user.id;

  try {
    // basic conflict check
    const exists = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      startTime,
      status: { $ne: "cancelled" }
    });

    if (exists) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date: new Date(date),
      startTime,
      endTime,
      reason
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listAppointments = async (req, res) => {
  try {
    const query = {};

    if (req.user.role === "patient") query.patientId = req.user.id;
    if (req.user.role === "doctor") query.doctorId = req.user.id;

    const list = await Appointment.find(query)
      .sort({ date: -1 })
      .limit(200);

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};