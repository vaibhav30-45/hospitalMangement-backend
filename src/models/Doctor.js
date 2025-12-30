import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // image URL or filename
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);