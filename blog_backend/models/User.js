const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  password: { type: String, required: true },
  fullName: { type: String, required: false },
  profilePic: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);
