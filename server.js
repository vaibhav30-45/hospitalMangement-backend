import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

//  Import Routes
import userRoutes from "./routes/userRoute.js";
import patientRoutes from "./routes/patients.js";
import appointmentRoutes from "./routes/appointmentRoute.js";
import reportRoutes from "./routes/reportRoute.js";

dotenv.config();
const app = express();

//  Middleware
app.use(cors());
app.use(express.json());

//  Connect Database
connectDB();

//  Default Route
app.get("/", (req, res) => {
  res.send("Patient Backend Running...");
});

// Use Routes (FINAL & CLEAN)
app.use("/api/users", userRoutes);          // signup, login
app.use("/api/patients", patientRoutes);    // patient CRUD, profile
app.use("/api/appointments", appointmentRoutes);  
app.use("/api/reports", reportRoutes);

//  Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





