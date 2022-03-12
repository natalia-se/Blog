const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");
const bcrypt = require("bcrypt");

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
router.put("/:id", async (req, res) => {
  const { id, password } = req.body;

  if (id === req.params.id) {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
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
router.delete("/:id", async (req, res) => {
  const { id } = req.body;

  if (id === req.params.id) {
    try {
      const user = await User.findById(id);

      try {
        await Message.deleteMany({ user_id: id });
        await User.findByIdAndDelete(id);
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
