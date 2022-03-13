const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");
const bcrypt = require("bcrypt");
const { requireLogin } = require("./auth");

// Get
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, __v, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(404).json(error);
  }
});

// Update
router.put("/:id", requireLogin, async (req, res) => {
  const { userId } = req.user;
  const { password } = req.body;

  console.log(req.user);

  if (userId === req.params.id) {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update only your account");
  }
});

// Delete
router.delete("/:id", requireLogin, async (req, res) => {
  const { userId } = req.user;

  if (userId === req.params.id) {
    try {
      const user = await User.findById(userId);

      try {
        await Message.deleteMany({ userId });
        await User.findByIdAndDelete(userId);
        res.status(200).json("User has been deleted");
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account");
  }
});

module.exports = router;
