import User from "../models/User.js";
import Shipment from "../models/Shipment.js";

// ---- USERS ----
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // pa voye password
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

    shipment.status = "En attente"; // ajoute li nan Dashboard itilizatè
    await shipment.save();

    res.json({ message: "Pre-alert confirmed", shipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};