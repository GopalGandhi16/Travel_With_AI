const express = require("express");

const router = express.Router();

const tripController = require("../Controllers/tripController");

router.post("/generate", tripController.generateTrip);

module.exports = router;