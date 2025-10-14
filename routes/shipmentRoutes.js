// routes/shipmentRoutes.js
import express from "express";
import { getShipments, addShipment, upload } from "../controllers/shipmentController.js";

const router = express.Router();

// Lis colis pou itilizatè
router.get("/shipments", getShipments);

// Ajoute nouvo pre-alerte avèk upload receipt
router.post("/shipments", upload.single("receipt"), addShipment);

export default router;