import express from "express";
import Shipment from "../models/Shipment.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tout route bezwen itilizatè konekte
router.use(authMiddleware);

// GET tout koli itilizatè a
router.get("/shipments", async (req, res) => {
  try {
    const shipments = await Shipment.find({ email: req.user.email });
    res.json({ shipments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST pre-alerte nouvo koli
router.post("/shipments", async (req, res) => {
  try {
    const { items, tariff } = req.body;
    // pwa ak trackingNumber yo ap ajoute nan admin
    if (!items) return res.status(400).json({ error: "Atik obligatwa" });

    const shipment = await Shipment.create({
      email: req.user.email,
      items,
      tariff,
      status: "pre-alert",
    });

    res.status(201).json({ message: "Pre-alerte ajoute avèk siksè", shipment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;