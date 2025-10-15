import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: "Token manke" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ error: "Admin pa egziste" });

    req.admin = admin;
    next();
  } catch (err) {
    console.error("Erreur adminMiddleware:", err);
    res.status(401).json({ error: "Token invalid" });
  }
};