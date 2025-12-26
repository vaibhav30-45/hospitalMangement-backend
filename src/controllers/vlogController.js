import Vlog from "../models/Vlog.js";

/* ADMIN */
export const createVlog = async (req, res) => {
  res.json(await Vlog.create(req.body));
};

export const deleteVlog = async (req, res) => {
  await Vlog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

/* PUBLIC */
export const getVlogs = async (req, res) => {
  res.json(await Vlog.find().sort({ createdAt: -1 }));
};