const express = require("express");
const { signup } = require("../controller/signup"); // Import signup logic
const { login } = require("../controller/login"); // Import login logic
const { BestFriendName } = require("../controller/name");

const authRouter = express.Router();

authRouter.post("/signup",signup ); 
authRouter.post("/login", login); 
authRouter.post("/bestFriendName", BestFriendName);

module.exports = authRouter;
