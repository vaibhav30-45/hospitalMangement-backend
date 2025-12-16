import mongoose from "mongoose";

const labRequestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  status: {
    type: String,
    enum: ["Pending", "Sample Collected", "Completed"],
    default: "Pending"
  },
  requestDate: { type: Date, default: Date.now }
});

export default mongoose.model("LabRequest", labRequestSchema);
