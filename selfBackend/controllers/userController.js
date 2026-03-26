const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const Listing = require("../models/Listing");
const bcrypt = require("bcrypt")
// REGISTER


module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    await user.save();

    res.json({ msg: "User registered" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    res.json({ msg: "Login success", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.addToWatchlist = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isWatchlisted = user.watchlist.includes(listingId);

    if (isWatchlisted) {
      user.watchlist = user.watchlist.filter((id) => id.toString() !== listingId);
    } else {
      user.watchlist.push(listingId);
    }

    await user.save();
    res.json({ msg: isWatchlisted ? "Removed from watchlist" : "Added to watchlist", watchlist: user.watchlist });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("watchlist");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
