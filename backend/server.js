const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const authRouter = require("./routes/auth");

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));// 🔥 Allow CORS for all origins

// MongoDB connection
app.use("/auth",authRouter)

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  try {
  connectDB
  console.log(`Server running on port ${PORT} ${process.env.MONGO_URI}`);

    
  } catch (error) {
    console.log(error)
  }
});
