import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import {
  getAllUsers,
  deleteUser,
  getAllShipments,
  addShipmentAdmin,
  getAllPreAlerts,
  confirmPreAlert
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js"; // ✅ note {}

// Route login admin (pa bezwen middleware)
router.post("/login", async (req, res) => { ... });

// Middleware pwoteje rès route
router.use(authMiddleware);
router.use(adminMiddleware);

// USERS
router.get("/users", getAllUsers);
...