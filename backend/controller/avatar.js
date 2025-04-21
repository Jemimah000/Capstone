// controller/avatar.js
const Avatar = require("../models/avatar");

exports.saveAvatar = async (req, res) => {
  const { username, avatarUrl } = req.body;

  console.log("📥 Incoming avatar data:", username, avatarUrl); 

  if (!username || !avatarUrl) {
    return res.status(400).json({ error: "Username and avatar URL are required." });
  }

  try {
    const existingAvatar = await Avatar.findOne({ username });

    if (existingAvatar) {
      existingAvatar.avatarUrl = avatarUrl;
      await existingAvatar.save();
      return res.status(200).json({ message: "Avatar updated successfully!" });
    }

    const newAvatar = new Avatar({ username, avatarUrl });
    await newAvatar.save();
    res.status(201).json({ message: "Avatar saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving avatar:", err);
    res.status(500).json({ error: "Server error." });
  }
};
