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
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);