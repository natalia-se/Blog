const express = require("express");
const app = express();

app.use("/", (req, res) => {
  console.log("Home page");
});

app.listen("5000", () => {
  console.log("Backend is running");
});
