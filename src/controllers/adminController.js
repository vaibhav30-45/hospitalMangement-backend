import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

/* ================= ADMIN SIGNUP ================= */
export const adminSignup = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (!name || !email || !password || !secretKey) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔐 SECURITY CHECK (VERY IMPORTANT)
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Unauthorized admin signup" });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Admin created successfully",
      adminId: admin._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ADMIN LOGIN ================= */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // Doctors
    const allDoctors = await Doctor.countDocuments();

    // Appointments
    const totalAppointments = await Appointment.countDocuments();

    const today = new Date().toISOString().split("T")[0];

    const todaySessions = await Appointment.countDocuments({
      date: today
    });

    const newBooking = todaySessions;

    // Unique patients (mobile or email)
    const allPatients = (await Appointment.distinct("mobile")).length;

    const pendingAppointments = await Appointment.countDocuments({
      status: "Pending",
    });

    res.status(200).json({
      allDoctors,
      allPatients,
      newBooking,
      todaySessions,
      totalAppointments,
      pendingAppointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUpcomingAppointments = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const appointments = await Appointment.find({
      date: { $gte: today }
    })
      .sort({ date: 1, time: 1 })
      .limit(5); // sirf next 5 upcoming

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};