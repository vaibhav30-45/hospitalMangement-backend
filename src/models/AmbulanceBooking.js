import mongoose from "mongoose";

const ambulanceBookingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    condition: {
      type: String,
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    dropAddress: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    ambulanceType: {
      type: String,
      required: true,
    },

},  
{ timestamps: true } 
);

export default mongoose.model("AmbulanceBooking", ambulanceBookingSchema);