import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB konekte"))
  .catch((err) => console.error("❌ Erè koneksyon MongoDB:", err));

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Flashipping backend ap mache !");
});

app.listen(process.env.PORT || 10000, () =>
  console.log(`⚡ Serveur ap kouri sou port ${process.env.PORT || 10000}`)
);