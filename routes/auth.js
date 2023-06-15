const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/User");
router.post("/user", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user = new User({
    name: name,
    email: email,
    password: password,
  });
  user.save();
  res.status(200).json({ user: user });
});

module.exports = router;
