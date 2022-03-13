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
    if (error.code && error.code === 11000) {
      res.status(400).json("Duplicate username");
    } else {
      res.status(500).json("Internal server error");
    }
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username}, password: ${password}`);
  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userId = user._id.toString();
      const token = jwt.sign(
        { userId, userName: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1 h",
          subject: userId,
        }
      );

      res.status(200).json({ token });
      return;
    } else {
      res.status(401).json("Wrong credentials!");
      return;
    }
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
