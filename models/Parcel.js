import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  history: [
    {
      location: String,
      state: String,
      date: Date,
    },
  ],
});

export default mongoose.model("Parcel", parcelSchema);