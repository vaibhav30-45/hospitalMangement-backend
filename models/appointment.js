import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    department: String,
    doctor: String,
    date: String,
    time: String,
    fullName: String,
    age: Number,
    mobile: String,
    email: String,
    gender: String,
    symptoms: String,
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;

