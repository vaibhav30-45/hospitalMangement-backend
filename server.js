import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

//  Import Patient System Routes
import userRoutes from "./routes/userRoute.js";
import patientRoutes from "./routes/patients.js";
import appointmentRoutes from "./routes/appointmentRoute.js";
import reportRoutes from "./routes/reportRoute.js";

//  Import Laboratory Test Module Routes
import testRoutes from "./routes/testRoute.js";           
import testBookRoutes from "./routes/testbookRoute.js";   

dotenv.config();
const app = express();

//  Middleware
app.use(cors());
app.use(express.json());

//  Connect Database
connectDB();

//  Default Route
app.get("/", (req, res) => {
  res.send("Patient + Laboratory Backend Running...");
});


// Patient Management
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reports", reportRoutes);

// Laboratory Management
app.use("/api/tests", testRoutes);             // Test CRUD
app.use("/api/testbookings", testBookRoutes);  // Patient Test Bookings

//  Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});






