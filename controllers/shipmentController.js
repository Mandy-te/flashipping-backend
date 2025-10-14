import Shipment from "../models/Shipment.js";

// Pre-alert – kliyan ajoute
export const addShipment = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    // Validasyon: tout chan obligatwa
    if (!customerName || !items || !items.length) {
      return res.status(400).json({ error: "Tout chan obligatwa!" });
    }

    for (const item of items) {
      if (!item.name || !item.quantity || !item.value || !item.receiptUrl) {
        return res.status(400).json({ error: "Tout chan pou chak atik obligatwa!" });
      }
    }

    const shipment = await Shipment.create({ customerName, items });
    res.status(201).json({ message: "Pre-alerte kreye ak siksè", shipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: ajoute pwa / modifye statut
export const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { weight, status } = req.body;

    const shipment = await Shipment.findById(id);
    if (!shipment) return res.status(404).json({ error: "Koli pa jwenn" });

    if (weight !== undefined) shipment.weight = weight;
    if (status) shipment.status = status;

    await shipment.save();
    res.json({ message: "Shipment modifye", shipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};