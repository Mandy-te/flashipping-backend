import Shipment from "../models/Shipment.js";
import multer from "multer";
import path from "path";

// Konfigirasyon multer pou sove fichye nan folder "uploads"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // kreye folder sa nan rasin backend si li pa egziste
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const addShipment = async (req, res) => {
  try {
    const { email, weight, items, tariff } = req.body;
    const receiptUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const shipment = await Shipment.create({
      email,
      weight,
      items,
      tariff,
      receiptUrl,
      status: "En attente",
    });

    res.status(201).json({ message: "Pré-alerte créée avec succès!", shipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lis shipments
export const getShipments = async (req, res) => {
  try {
    const { email } = req.query;
    const shipments = await Shipment.find({ email });
    res.json({ shipments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};