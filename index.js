import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Storage tanporè (in-memory)
const users = [];

// Signup route
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Tout chan yo obligatwa" });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(409).json({ error: "User deja egziste" });
  }

  users.push({ name, email, password });
  return res.status(201).json({ user: name });
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email & modpas obligatwa" });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Email oswa modpas pa kòrèk" });
  }

  return res.status(200).json({ user: user.name });
});

// Start server
app.listen(PORT, () => {
  console.log(`Flashipping backend ap kouri sou http://localhost:${PORT}`);
});
