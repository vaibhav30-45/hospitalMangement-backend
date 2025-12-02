import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  reportTitle: String,
  description: String,
  date: String
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);
