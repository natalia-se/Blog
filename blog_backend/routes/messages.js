const router = require("express").Router();
const Message = require("../models/Message");
const { requireLogin } = require("./auth");

// Create post
router.post("/", requireLogin, async (req, res) => {
  const { userId, userName } = req.user;
  const text = req.body.text;
  const newMessage = new Message({ userId, userName, text });
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update post
router.put("/:id", requireLogin, async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;

  try {
    const message = await Message.findById(id);

    if (message.userId.toString() === userId) {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMessage);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can update only your message");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get post
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    const { __v, ...rest } = message._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(404).json(error);
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  try {
    let messages;
    if (userId) {
      messages = await Message.find({ userId });
    } else {
      messages = await Message.find();
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json(error);
  }
});

// Delete post
router.delete("/:id", requireLogin, async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user;

  try {
    const message = await Message.findById(id);

    if (message.userId.toString() === userId) {
      try {
        await message.delete();
        res.status(200).json("Your message has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can delete only your message");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
