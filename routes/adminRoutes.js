import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllShipments,
  addShipmentAdmin,
  getAllPreAlerts,
  confirmPreAlert
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Tout route sa yo admin only
router.use(authMiddleware);
router.use(adminMiddleware);

// USERS
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// SHIPMENTS
router.get("/shipments", getAllShipments);
router.post("/shipments", addShipmentAdmin);

// PRE-ALERTS
router.get("/prealerts", getAllPreAlerts);
router.patch("/prealerts/:id/confirm", confirmPreAlert);

export default router;