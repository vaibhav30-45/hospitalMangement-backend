import mongoose from "mongoose";

const bloodInventorySchema = new mongoose.Schema({
  bloodGroup: { 
    type: String, 
    required: true,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], 
  },

  units: { type: Number, default: 0 },

  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("Blood", bloodInventorySchema);