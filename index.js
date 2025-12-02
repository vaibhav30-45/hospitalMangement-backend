import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

import doctorRoutes from "./src/routes/doctors.js";
import appointmentRoutes from "./src/routes/appointments.js";

app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);