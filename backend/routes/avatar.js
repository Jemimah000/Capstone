const express = require("express");
const { saveAvatar } = require("../controller/avatar");

const router = express.Router();

router.post("/save-avatar", saveAvatar);

module.exports = router;
