const express = require("express");
const { signup } = require("../controller/signup"); // Import signup logic
const { login } = require("../controller/login"); // Import login logic

const authRouter = express.Router();

authRouter.post("/signup",signup ); // Route for user registration
authRouter.post("/login", login); // Route for user login

module.exports = authRouter;
