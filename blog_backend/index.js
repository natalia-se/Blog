const express = require("express");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { authRoute, authorization, requireLogin } = require("./routes/auth");
const userRoute = require("./routes/users");
const messageRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path");

const app = express();

dotenv.config();
app.use(express.json());
app.use(authorization);
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("mongo is running"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);

app.get("/", requireLogin, async (req, res) => {
  res.json({ greeting: `Hello ${req.user.username}` });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend is running as http://localhost:${process.env.PORT}`);
});
