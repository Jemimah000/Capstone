// controller/name.js

exports.BestFriendName = async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ message: "Name is required!" });
      }
  
      res.status(200).json({ message: `Nice ${name}, now onwards you're my best friend! 💖` });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };