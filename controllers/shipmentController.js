import Shipment from "../models/Shipment.js";

// Ranmase lis koli pou yon itilizatè
export const getShipments = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email obligatwa" });

  try {
    const shipments = await Shipment.find({ email }).sort({ updatedAt: -1 });
    res.json({ shipments });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Ajoute yon nouvo koli (pre-alerte)
export const addShipment = async (req, res) => {
  const { email, weight, items, tariff } = req.body;
  if (!email || !weight || !items) {
    return res.status(400).json({ error: "Tout chan obligatwa yo dwe ranpli" });
  }

  try {
    const shipment = await Shipment.create({ email, weight, items, tariff });
    res.status(201).json({ message: "Nouvo koli ajoute avèk siksè", shipment });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};