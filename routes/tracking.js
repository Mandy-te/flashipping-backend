import express from "express";
const router = express.Router();

// 🔹 Simulasyon done parcel (pi ta nou ka konekte sa ak MongoDB oswa MySQL)
const parcels = [
  {
    trackingNumber: "FL123456",
    status: "En transit",
    location: "Miami, FL",
    lastUpdate: "2025-10-09 10:00:00",
  },
  {
    trackingNumber: "FL789012",
    status: "Livré",
    location: "Port-au-Prince, HT",
    lastUpdate: "2025-10-08 15:30:00",
  },
];

// 🔹 Route GET pou jwenn info parcel
router.get("/:trackingNumber", (req, res) => {
  const { trackingNumber } = req.params;
  const parcel = parcels.find(
    (p) => p.trackingNumber === trackingNumber.toUpperCase()
  );

  if (!parcel) {
    return res.status(404).json({ error: "Aucun colis trouvé avec ce numéro." });
  }

  res.json(parcel);
});

export default router;