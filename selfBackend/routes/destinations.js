const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");

router.get("/", destinationController.getAllDestinations);
router.get("/search", destinationController.searchDestinations);

router.get("/:slug", destinationController.getDestinationBySlug);

router.get("/:slug/hotels", destinationController.getHotelsByDestination);

router.get("/:slug/restaurants", destinationController.getRestaurantsByDestination);

router.get("/:slug/activities", destinationController.getActivitiesByDestination);

// ADD THESE
router.get("/:slug/reviews", destinationController.getReviewsByDestination);
router.post("/:slug/reviews", destinationController.addReview);

module.exports = router;