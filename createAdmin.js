import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    const email = "admin@flaship.com";
    const password = "Admin123!";
    const existing = await Admin.findOne({ email });

    if (existing) {
      console.log("⚠️ Admin sa egziste deja:", existing.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();
    console.log("🎉 Admin créé avec succès !");
    console.log("🪪 Email:", email);
    console.log("🔑 Mot de passe:", password);
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur création admin:", err);
    process.exit(1);
  }
};

createAdmin();