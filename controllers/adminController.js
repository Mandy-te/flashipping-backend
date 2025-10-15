import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Shipment from "../models/Shipment.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --- LOGIN ADMIN ---
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Admin pa jwenn" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Modpas pa kòrèk" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ 
      user: { id: admin._id, email: admin.email, role: "admin" },
      token 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ---- USERS ----
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- SHIPMENTS ----
export const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json({ shipments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addShipmentAdmin = async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body);
    res.status(201).json({ message: "Shipment added", shipment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ---- PRE-ALERTS ----
export const getAllPreAlerts = async (req, res) => {
  try {
    const preAlerts = await Shipment.find({ status: "pre-alert" });
    res.json({ preAlerts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const confirmPreAlert = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ error: "Shipment not found" });

    shipment.status = "En attente";
    await shipment.save();

    res.json({ message: "Pre-alert confirmed", shipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};