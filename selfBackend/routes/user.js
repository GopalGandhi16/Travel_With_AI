const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

// user signup
router.post("/register" , userController.registerUser);
router.post("/login", userController.loginUser);

// user watchlist
router.post("/watchlist/:destinationId", userController.addToWatchlist);

router.get("/watchlist/:userId", userController.getWatchlist);

router.delete("/watchlist/:destinationId", userController.removeFromWatchlist);
router.post(
  "/bookings",
  userController.createBooking
);
router.get("/bookings/:userId", userController.getBookings);

module.exports = router;
