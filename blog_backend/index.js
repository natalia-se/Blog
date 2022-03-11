const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use("/", (req, res) => {
  console.log("Home page");
});

app.listen(process.env.PORT, () => {
  console.log("Backend is running");
});
