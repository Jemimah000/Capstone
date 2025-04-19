const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", username: newUser.username });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};
