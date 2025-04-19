const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, bestFriendName } = req.body;

    console.log("🔍 Signup Request Body:", req.body); // <--- add this

    if (!username || !email || !password || !bestFriendName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      bestFriendName,
    });

    await newUser.save();

    console.log("✅ New user created:", newUser); // <--- add this

    res.status(201).json({
      message: "User registered successfully!",
      username: newUser.username,
    });
  } catch (error) {
    console.error("❌ Signup Error:", error); // <--- important
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

