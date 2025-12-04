// role-based authorization middleware (ESM)
export default function authorize(allowedRoles = []) {
  return (req, res, next) => {
    const user = req.user;
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
}
