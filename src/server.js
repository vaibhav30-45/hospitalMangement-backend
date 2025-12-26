import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import adminRoutes from "./routes/adminRoute.js";
import bloodRoutes from "./routes/blood.js";
import contactRoutes from "./routes/contactRoutes.js";
import vlogRoutes from "./routes/vlogRoutes.js";

// ------------------------------
//  Import Patient & Lab Routes (from remote)
// ------------------------------

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

app.use("/api/admin", adminRoutes);
app.use("/api/blood", bloodRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/vlogs", vlogRoutes);

// ------------------------------
//  Patient System Routes
// ------------------------------
app.use("/api/reports", reportRoutes);

// ------------------------------
//  Laboratory Test Module Routes
// ------------------------------
app.use("/api/tests", testRoutes);
app.use("/api/testbookings", testBookRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
