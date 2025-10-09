require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const trackingRoutes = require("./routes/tracking");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/tracking", trackingRoutes);

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));