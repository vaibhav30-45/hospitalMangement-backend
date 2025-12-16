import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model("Test", testSchema);
