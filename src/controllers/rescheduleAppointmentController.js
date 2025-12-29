import Appointment from "../models/Appointment.js";

const rescheduleAppointment = async (req, res) => {
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

    res.json({
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

export { rescheduleAppointment };

