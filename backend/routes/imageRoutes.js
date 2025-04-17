const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const UserImage = require("../models/userImage");

const router = express.Router();

// 🔧 Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('📁 Uploads folder created!');
}

// 🔧 Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/* ✅ Upload Front Image */
router.post("/upload-front", upload.single('frontImage'), async (req, res) => {
  const { username } = req.body;
  if (!req.file || !username) {
    return res.status(400).json({ success: false, message: "Missing frontImage or username" });
  }

  try {
    const frontImagePath = req.file.path;
    await UserImage.findOneAndUpdate(
      { username },
      { frontImage: frontImagePath },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: "Front image uploaded", path: frontImagePath });
  } catch (err) {
    console.error("❌ Upload Front Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ✅ Upload Left Image */
router.post("/upload-left", upload.single('leftImage'), async (req, res) => {
  const { username } = req.body;
  if (!req.file || !username) {
    return res.status(400).json({ success: false, message: "Missing leftImage or username" });
  }

  try {
    const leftImagePath = req.file.path;
    await UserImage.findOneAndUpdate(
      { username },
      { leftImage: leftImagePath },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: "Left image uploaded", path: leftImagePath });
  } catch (err) {
    console.error("❌ Upload Left Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ✅ Upload Right Image */
router.post("/upload-right", upload.single('rightImage'), async (req, res) => {
  const { username } = req.body;
  if (!req.file || !username) {
    return res.status(400).json({ success: false, message: "Missing rightImage or username" });
  }

  try {
    const rightImagePath = req.file.path;
    await UserImage.findOneAndUpdate(
      { username },
      { rightImage: rightImagePath },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: "Right image uploaded", path: rightImagePath });
  } catch (err) {
    console.error("❌ Upload Right Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
