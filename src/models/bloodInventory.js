import mongoose from "mongoose";

const bloodInventorySchema = new mongoose.Schema({
  bloodGroup: { 
    type: String, 
    required: true,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], 
  },

  units: { type: Number, default: 0 },

  location: {
      type: String,
      default: "Main Storage", 
    },

  lastUpdated: { type: Date, default: Date.now }
});

// Prevent duplicate inventory record per location
bloodInventorySchema.index({ bloodGroup: 1, location: 1 }, { unique: true });

export default mongoose.model("BloodInventory", bloodInventorySchema);
