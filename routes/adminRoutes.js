// routes/adminRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import {
  getAllUsers,
  deleteUser,
  getAllShipments,
  addShipmentAdmin,
  getAllPreAlerts,
  confirmPreAlert
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ ROUTE LOGIN ADMIN (san authMiddleware)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Admin inexistant" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Connexion réussie ✅",
      user: {
        id: admin._id,
        email: admin.email,
        role: "admin" // ✅ Role admin pou frontend verifye
      },
      token,
    });
  } catch (err) {
    console.error("Erreur login admin:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Apre login sèlman, nou pwoteje rès routes yo
router.use(authMiddleware);
router.use(adminMiddleware);

// USERS
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// SHIPMENTS
router.get("/shipments", getAllShipments);
router.post("/shipments", addShipmentAdmin);

// PRE-ALERTS
router.get("/prealerts", getAllPreAlerts);
router.patch("/prealerts/:id/confirm", confirmPreAlert);

export default router;