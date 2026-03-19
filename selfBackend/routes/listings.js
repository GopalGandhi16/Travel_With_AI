const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listings");

// GET all listings
router.get("/", listingController.getAllListings);

// GET single listing
router.get("/:id", listingController.getListingById);

// CREATE listing
router.post("/", listingController.createListing);

module.exports = router;