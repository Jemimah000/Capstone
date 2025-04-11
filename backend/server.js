const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./db/db");
const authRouter = require("./routes/auth");
const imageRouter = require("./routes/imageRoutes");

dotenv.config();

const app = express();

// ✅ CORS setup must be done early
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handles preflight CORS requests

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
connectDB();

// ✅ Serve static image files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/auth", authRouter);
app.use("/api", imageRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
