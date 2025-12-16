import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';

import doctorRoutes from "./src/routes/doctors.js";
import bloodRoutes from "./src/routes/blood.js";
import contactRoutes from "./src/routes/contactRoutes.js";

// ------------------------------
//  Import Patient & Lab Routes (from remote)
// ------------------------------
import userRoutes from "./routes/userRoute.js";
import patientRoutes from "./routes/patients.js";
import appointmentRoutes2 from "./routes/appointmentRoute.js"; 
import reportRoutes from "./routes/reportRoute.js";
import testRoutes from "./routes/testRoute.js";
import testBookRoutes from "./routes/testbookRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.json());

//  Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ success: false, message: "Server Error" });
});

//  Default Route
app.get("/", (req, res) => {
  res.send("Hospital Management Backend Running...");
});

app.use("/api/doctors", doctorRoutes);
app.use("/api/blood", bloodRoutes);
app.use("/api", contactRoutes);


// ------------------------------
//  Patient System Routes
// ------------------------------
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/patient-appointments", appointmentRoutes2);
app.use("/api/reports", reportRoutes);

// ------------------------------
//  Laboratory Test Module Routes
// ------------------------------
app.use("/api/tests", testRoutes);
app.use("/api/testbookings", testBookRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
