const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Setup storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.fieldname + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// FRONT Upload
router.post("/upload-front", upload.single("frontImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Front image required" });
  }
  res.json({ success: true, message: "Front uploaded ✨", path: req.file.path });
});

// LEFT Upload
router.post("/upload-left", upload.single("leftImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Left image is required" });
  }
  res.json({
    success: true,
    message: "Left image uploaded successfully ✨",
    path: req.file.path,
  });
});

// RIGHT Upload
router.post("/upload-right", upload.single("rightImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Right image is required" });
  }

  res.json({
    success: true,
    message: "Right image uploaded successfully ✨",
    path: req.file.path,
  });
});


module.exports = router;
