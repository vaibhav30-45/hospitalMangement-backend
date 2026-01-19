import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  email: { type: String },

  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit contact number"]
  },

  address: { type: String, trim: true },

  bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
  },

  lastDonationDate: { type: Date },

  totalDonations: { type: Number, default: 0 },

  notes: { type: String },
},
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("Donor", donorSchema);
