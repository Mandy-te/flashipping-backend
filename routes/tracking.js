const express = require("express");
const router = express.Router();
const Parcel = require("../models/Parcel");

// Créer un parcel
router.post("/add", async (req, res) => {
  try {
    const parcel = await Parcel.create(req.body);
    res.status(201).json({ message: "Colis ajouté", parcel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Suivi par trackingNumber
router.get("/:trackingNumber", async (req, res) => {
  const parcel = await Parcel.findOne({ trackingNumber: req.params.trackingNumber });
  if (!parcel) return res.status(404).json({ error: "Colis non trouvé" });
  res.json(parcel);
});

module.exports = router;