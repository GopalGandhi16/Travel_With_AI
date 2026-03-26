const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

// user signup
router.post("/register" , userController.registerUser);
router.post("/login", userController.loginUser);

// user watchlist
router.post("/watchlist/:listingId", userController.addToWatchlist);
router.get("/watchlist/:userId", userController.getWatchlist);

module.exports = router;