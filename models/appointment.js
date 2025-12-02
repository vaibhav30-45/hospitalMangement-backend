import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorName: String,
  department: String,
  date: String,
  time: String
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
