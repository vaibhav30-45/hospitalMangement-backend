import Report from "../models/report.js";

export const uploadReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    const saved = await report.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ patientId: req.params.id });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
