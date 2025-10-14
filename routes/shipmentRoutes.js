import express from "express";
import { getShipments, addShipment } from "../controllers/shipmentController.js";

const router = express.Router();

router.get("/shipments", getShipments);
router.post("/shipments", addShipment);

export default router;