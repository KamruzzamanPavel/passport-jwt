const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

// Registration route
router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  try {
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ name, password });
    await user.save();
    const payload = { id: user.id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 * 1000 * 24 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  req.session.count = 1;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = { id: user.id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Logout route
router.post("/logout", (req, res) => {
  console.log("logout");
  req.session.destroy((err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
    res.clearCookie("connect.sid"); // Optional: Clear the cookie if you're using cookies to store sessions
    res.json({ msg: "Logged out successfully" });
  });
});

module.exports = router;
