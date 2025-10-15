// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

// ----------------------------
// Middleware pou itilizatè
// ----------------------------
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: "Token manke" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: "User pa egziste" });

    req.user = user; // mete user nan req pou kontinye
    next();
  } catch (err) {
    console.error("Erreur authMiddleware:", err);
    res.status(401).json({ error: "Token invalid" });
  }
};

// ----------------------------
// Middleware pou admin
// ----------------------------
const adminMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Pa gen token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Pa gen token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ou ka swa mete decoded nan req.admin oswa fè lookup si ou bezwen
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ error: "Admin pa egziste" });

    req.admin = admin; // mete admin nan req pou kontinye
    next();
  } catch (err) {
    console.error("Erreur adminMiddleware:", err);
    res.status(401).json({ error: "Token pa valab" });
  }
};

// Default export pou authMiddleware
export default authMiddleware;

// Named export pou adminMiddleware
export { adminMiddleware };