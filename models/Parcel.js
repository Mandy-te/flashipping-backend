const mongoose = require("mongoose");

const ParcelSchema = new mongoose.Schema({
  trackingNumber: { type: String, unique: true },
  weight: Number,
  value: Number,
  status: { type: String, default: "En attente" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Parcel", ParcelSchema);