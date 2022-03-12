const router = require("express").Router();
const Message = require("../models/Message");

// Create post
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update post
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const user_id = req.body.user_id;

  try {
    const message = await Message.findById(id);

    if (message.user_id.toString() === user_id) {
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

// Delete post
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user_id = req.body.user_id;

  try {
    const message = await Message.findById(id);

    if (message.user_id.toString() === user_id) {
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
