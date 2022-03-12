const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const messageRoute = require("./routes/messages");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("mongo is running"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);

app.use("/", (req, res) => {
  console.log("Home page");
});

app.listen(process.env.PORT, () => {
  console.log(`Backend is running as http://localhost:${process.env.PORT}`);
});
