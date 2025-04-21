const express = require("express");
const { saveAvatar } = require("../controller/avatar");

const router = express.Router();

// Route to save avatar information
router.post("/save-avatar", saveAvatar);

module.exports = router;
