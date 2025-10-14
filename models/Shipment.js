import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },       // email itilizatè
    weight: { type: String, default: "" },         // pwa pa obligatwa pou pre-alerte
    items: { type: String, required: true },       // deskripsyon atik yo
    tariff: { type: String, default: "" },         // tarif si admin mete li
    status: { type: String, default: "En attente" }, // statut: En attente / Confirmé / Livré
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;