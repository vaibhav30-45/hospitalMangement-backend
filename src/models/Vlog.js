import mongoose from "mongoose";

const vlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Vlog", vlogSchema);