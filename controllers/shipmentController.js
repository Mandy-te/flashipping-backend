// controllers/shipmentController.js
import Shipment from "../models/Shipment.js";
import multer from "multer";
import path from "path";

// Konfigirasyon multer pou upload fichye
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ou ka chanje folder lah si ou vle
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
export const upload = multer({ storage });

// Lis colis pou itilizatè
export const getShipments = async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email manke" });

  try {
    const shipments = await Shipment.find({ email }).sort({ createdAt: -1 });
    res.json({ shipments });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Ajoute nouvo pre-alerte
export const addShipment = async (req, res) => {
  const { email, items, tariff, trackingNumber } = req.body;

  if (!email || !items || !trackingNumber) {
    return res.status(400).json({ error: "Email, Atik ak Tracking Number obligatwa" });
  }

  try {
    const newShipment = await Shipment.create({
      email,
      items,
      tariff: tariff || "",
      trackingNumber,
      status: "En attente",
      weight: "", // admin ap mete li pita
      receipt: req.file ? req.file.filename : "", // si gen fichye upload
    });
    res.status(201).json({ message: "Pre-alerte ajoute avèk siksè!", shipment: newShipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};