import express from "express";
import { addShipment, getShipments, upload } from "../controllers/shipmentController.js";

const router = express.Router();

router.get("/", getShipments);
router.post("/", upload.single("receipt"), addShipment); // upload.single('receipt') pou resevwa imaj

export default router;