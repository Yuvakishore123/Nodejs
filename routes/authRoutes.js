const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.use(express.json());

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).send({ error: "Please fill email and password" });
  }
  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }
    const user = new User({
      name,
      email,
      password,
    });
    try {
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);
      res.send({ token });
    } catch (error) {
      console.log(error);
    }
  });
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Please Enter email and password" });
  }
  const savedUser = await User.findOne({ email: email });
  if (!savedUser) {
    return res.status(422).json({ error: "user doesnot exist" });
  }
 try {
    if (password === savedUser.password) {
      console.log("Password matched");
      const token = jwt.sign({ _id: savedUser._id }, process.env.jwt_secret);
      res.send({ token });
    } else {
      return res.status(422).send({ error: "Password does not match" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
