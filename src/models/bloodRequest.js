import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bloodGroup: { type: String, required: true },
  unitsRequested: { type: Number, required: true },
  reason: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "issued"],
    default: "pending"
  },
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  issuedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("BloodRequest", bloodRequestSchema);
