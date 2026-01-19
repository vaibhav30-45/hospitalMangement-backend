import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    units: { type: Number, required: true },
    contact: {
      type: String, required: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit contact number"]
    },
    urgency: {
      type: String,
      enum: ["Normal", "Emergency"],
      default: "Normal",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Approved",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodRequest", bloodRequestSchema);
