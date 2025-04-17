const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const UserImage = require("../models/userImage");

const router = express.Router();

// 🔧 Multer Setup
const uploadDir = path.join(__dirname, '../uploads');

// Check if the uploads folder exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads folder created!');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Dynamic multer error handler
const multerErrorHandler = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ success: false, message: "Multer error occurred" });
      }
      next();
    });
  };
};

/* ✅ Upload Front Image */
router.post("/upload-front", multerErrorHandler('frontImage'), async (req, res) => {
  const { username } = req.body;

  if (!req.file || !username) {
    return res.status(400).json({ success: false, message: "Missing frontImage or username" });
  }

  const frontImagePath = req.file.path;

  try {
    let user = await UserImage.findOne({ username });

    if (!user) {
      user = new UserImage({ username, frontImage: frontImagePath });
    } else {
      user.frontImage = frontImagePath;
    }

    await user.save();
    res.json({ success: true, message: "Front image uploaded", path: frontImagePath });
  } catch (err) {
    console.error("❌ Upload Front Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ✅ Upload Left Image */
router.post("/upload-left", multerErrorHandler('leftImage'), async (req, res) => {
  const { username } = req.body;

  if (!req.file || !username) {
    return res.status(400).json({ success: false, message: "Missing leftImage or username" });
  }

  const leftImagePath = req.file.path;

  try {
    let user = await UserImage.findOne({ username });

    if (!user) {
      user = new UserImage({ username, leftImage: leftImagePath });
    } else {
      user.leftImage = leftImagePath;
    }

    await user.save();
    res.json({ success: true, message: "Left image uploaded", path: leftImagePath });
  } catch (err) {
    console.error("❌ Upload Left Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ✅ Upload Right Image */
router.post("/upload-right", multerErrorHandler('rightImage'), async (req, res) => {
  const { username } = req.body;

  if (!req.file || !username) {
    return res.status(400).json({ success: false, message: "Missing rightImage or username" });
  }

  const rightImagePath = req.file.path;

  try {
    let user = await UserImage.findOne({ username });

    if (!user) {
      user = new UserImage({ username, rightImage: rightImagePath });
    } else {
      user.rightImage = rightImagePath;
    }

    await user.save();
    res.json({ success: true, message: "Right image uploaded", path: rightImagePath });
  } catch (err) {
    console.error("❌ Upload Right Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
