const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const Destination = require("../Models/Destinations");
const Hotel = require("../Models/Hotels");
const Restaurant = require("../Models/Restaurants");
const Activity = require("../Models/Activities");
const Booking = require("../Models/Booking");
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

exports.addToWatchlist = async (req, res) => {
  try {
    console.log("Params:", req.params);
    console.log("Body:", req.body);

    const { userId } = req.body;
    const { destinationId } = req.params;

    const user = await User.findById(userId);

    console.log("User:", user);
    if (user) {
      console.log("Watchlist IDs:", user.watchlist);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.watchlist.includes(destinationId)) {
      return res.status(400).json({
        success: false,
        message: "Already added",
      });
    }

    user.watchlist.push(destinationId);
    await user.save();

    return res.json({
      success: true,
      message: "Added",
    });

  } catch (err) {
    console.log(err);   // <-- IMPORTANT
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.getWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    console.log("User =", user);
    console.log("Watchlist IDs =", user.watchlist);

    const Destination = require("../Models/Destinations");

    const destinations = await Destination.find({
      _id: { $in: user.watchlist },
    });

    console.log("Destinations =", destinations);

    return res.json(destinations);
  } catch (err) {
    console.log(err);
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { userId } = req.body;
    const { destinationId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== destinationId
    );
    await user.save();

    return res.json({
      success: true,
      message: "Removed from watchlist",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.createBooking = async (req, res) => {
  try {
    const {
      userId,
      hotelId,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    const numberOfNights = Math.ceil(
      (outDate - inDate) / (1000 * 60 * 60 * 24)
    );

    if (numberOfNights <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid dates",
      });
    }

    const totalAmount =
      hotel.pricePerNight * numberOfNights;

    const booking = await Booking.create({
      userId,
      hotelId,
      destinationId: hotel.destinationId,
      checkIn,
      checkOut,
      guests,
      numberOfNights,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Hotel Bookings
exports.getBookings = async (req, res) => {
  try {

    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate("hotelId")
      .populate("destinationId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};