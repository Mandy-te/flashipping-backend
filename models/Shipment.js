import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    email: { type: String, required: true }, // email itilizatè a
    weight: { type: String, required: true },
    items: { type: String, required: true },
    tariff: { type: String, default: "" },
    status: { type: String, default: "En attente" },
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;