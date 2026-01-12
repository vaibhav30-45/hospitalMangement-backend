import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  heading: String,
  content: String,
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Health Care",
    },
    image: {
      type: String, // image URL (Cloudinary / public URL)
      required: true,
    },
    shortDesc: {
      type: String,
      //required: true,
    },
    fullDesc: [sectionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
