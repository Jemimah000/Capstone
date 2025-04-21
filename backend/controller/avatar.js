// controller/avatar.js
const User = require("../models/user");

exports.saveAvatar = async (req, res) => {
  const { username, avatarUrl } = req.body;

  console.log("📥 Incoming avatar data:", username, avatarUrl); 

  if (!username || !avatarUrl) {
    return res.status(400).json({ error: "Username and avatar URL are required." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.avatarUrl = avatarUrl;
    await user.save();

    res.status(200).json({ message: "Avatar saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving avatar:", err);
    res.status(500).json({ error: "Server error." });
  }
};
