import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ msg: "Admin only" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }

  req.admin = decoded;
  next();
};

export default adminAuth;
