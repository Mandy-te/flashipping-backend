import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import readline from "readline";
import Admin from "./models/Admin.js"; // asire w ke chemen an kòrèk

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB konekte ✅");

    const email = await askQuestion("Antre email admin: ");
    const password = await askQuestion("Antre modpas admin: ");
    rl.close();

    // verifye si admin deja egziste
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin deja egziste ✅");
      process.exit(0);
    }

    // hash modpas la
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log(`Admin kreye avèk siksè ✅ (${email})`);
    process.exit(0);
  } catch (err) {
    console.error("Erè kreye admin:", err);
    process.exit(1);
  }
};

createAdmin();