const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listings");

// GET all listings
router.get("/", listingController.getAllListings);


// CREATE listing
router.post("/", listingController.createListing);

router.get("/:location " ,listingController.searchLocation);

router.get("/search/:location", listingController.searchLocation);
router.get("/:id", listingController.getListingById);
module.exports = router; 