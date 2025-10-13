import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route test pou verifye API a
app.get("/", (req, res) => {
  res.send("🚀 Flashipping backend is running perfectly!");
});

// Port pou lokal ak production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});