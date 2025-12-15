import Test from "../models/test.js";

// Add Test
export const addTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    const saved = await test.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Tests
export const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
