const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.ObjectId, required: true },
    user_name: { type: String, required: true },
    text: { type: String, required: true, minlength: 3, maxLenth: 140 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
