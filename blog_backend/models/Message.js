const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.ObjectId, required: true },
    userName: { type: String, required: true },
    text: { type: String, required: true, minlength: 3, maxLenth: 140 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
