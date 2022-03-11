const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRout = require("./routes/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("mongo is running"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRout);

app.use("/", (req, res) => {
  console.log("Home page");
});

app.listen(process.env.PORT, () => {
  console.log("Backend is running");
});
