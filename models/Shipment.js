import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      value: { type: Number, required: true },
      receiptUrl: { type: String, required: true }, // prèv acha
    },
  ],
  status: { type: String, default: "pre-alert" },
  weight: { type: Number }, // ajoute pa admin
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Shipment", shipmentSchema);