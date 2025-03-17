const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth"); // Import authentication routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Allows parsing JSON data
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ Database Connection Failed:", err));

// Routes
app.use("/api/auth", authRoutes); // Prefix all auth routes with /api/auth

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
