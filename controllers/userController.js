import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// SIGNUP

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    //  email exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashed
    });

    const savedUser = await user.save();
    res.status(201).json({
      message: "Signup Successful",
      user: savedUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// LOGIN

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Incorrect password" });

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
