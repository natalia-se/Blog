const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) {
      res.status(400).json("Wrong credentials!");
      return;
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      res.status(400).json("Wrong credentials!");
      return;
    }

    const { password, __v, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json(err);
  }
});

const authorization = (req, _res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  }
  next();
};

const requireLogin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json("Login required!");
  }
};

module.exports.authRoute = router;
module.exports.authorization = authorization;
module.exports.requireLogin = requireLogin;
