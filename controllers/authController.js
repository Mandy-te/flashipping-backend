import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // modele mongoose ou

// 🔹 Enskripsyon
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Verifye si itilizatè a deja egziste
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email deja anrejistre." });
    }

    // 2️⃣ Hash modpas la
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Kreye nouvo itilizatè a
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // 4️⃣ Retounen repons
    res.status(201).json({ message: "Itilizatè kreye avèk siksè ✅" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Erreur serveur pandan enskripsyon." });
  }
};

// 🔹 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Verifye si itilizatè egziste
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Itilizatè pa jwenn." });
    }

    // 2️⃣ Konpare modpas yo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Modpas ou mal." });
    }

    // 3️⃣ Kreye token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // valid pou 7 jou
    );

    // 4️⃣ Retounen done itilizatè + token
    res.status(200).json({
      message: "Login reussi ✅",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erreur serveur pandan login." });
  }
};