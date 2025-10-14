import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 🔗 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// 🛣 Routes principales
app.use("/api", authRoutes);

// 🌐 Route test
app.get("/", (req, res) => {
  res.send("🚀 Flashipping backend ap kouri avèk siksè!");
});

// 🚀 Lanse serveur lan
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🔥 Serveur kouri sou port ${PORT}`));