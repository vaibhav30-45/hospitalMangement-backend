import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

import adminRoutes from "./routes/adminRoute.js";
import bloodRoutes from "./routes/blood.js";
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import testRoutes from "./routes/testRoute.js";
import testBookRoutes from "./routes/testbookRoute.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 FIX FOR __dirname (ES MODULE)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use(express.json());

// ✅ STATIC UPLOADS (THIS IS THE FIX)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Default route
app.get("/", (req, res) => {
  res.send("Hospital Management Backend Running...");
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/blood", bloodRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/testbookings", testBookRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ success: false, message: "Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
