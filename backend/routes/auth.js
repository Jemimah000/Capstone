const express = require("express");
const { signup } = require("../controller/signup"); // Import signup logic
const { login } = require("../controller/login"); // Import login logic

const router = express.Router();

router.post("/signup", signup); // Route for user registration
router.post("/login", login); // Route for user login

module.exports = router;
