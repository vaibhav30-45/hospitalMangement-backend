import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  address: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  medicalHistory: String
}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
