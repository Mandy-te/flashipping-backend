import express from "express";
import Parcel from "../models/Parcel.js"; // Fichye model Parcel nou pral kreye

const router = express.Router();

// Get tracking info pa trackingNumber
router.get("/:trackingNumber", async (req, res) => {
  try {
    const parcel = await Parcel.findOne({ trackingNumber: req.params.trackingNumber });
    if (!parcel) return res.status(404).json({ error: "Colis introuvable" });
    res.json(parcel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;