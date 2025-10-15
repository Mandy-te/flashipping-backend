import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: "Token manke" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: "User pa egziste" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Erreur authMiddleware:", err);
    res.status(401).json({ error: "Token invalid" });
  }
};