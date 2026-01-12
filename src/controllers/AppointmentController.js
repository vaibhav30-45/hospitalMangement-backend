import Appointment from "../models/Appointment.js";

/* ================= BOOK APPOINTMENT ================= */
export const bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking failed",
      error: error.message,
    });
  }
};

export const rescheduleAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment rescheduled successfully",
      appointment: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reschedule failed",
      error: error.message,
    });
  }
};

/* ================= ADMIN – GET ALL APPOINTMENTS ================= */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      total: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json({ success: true, appointment });
};
