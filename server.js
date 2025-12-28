import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import appointmentRoutes from "./routes/appointmentRoutes.js";
import rescheduleAppointmentRoutes from "./routes/rescheduleAppointmentRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/appointments", rescheduleAppointmentRoutes);

app.get("/", (req, res) => {
  res.send("Hospital Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

