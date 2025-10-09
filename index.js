// Olye de require():
// const trackingRoutes = require("./routes/tracking");

// Itilize import:
import trackingRoutes from "./routes/tracking.js";
import cors from "cors";
import mongoose from "mongoose";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/tracking", trackingRoutes);

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));
