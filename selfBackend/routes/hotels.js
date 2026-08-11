const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.get("/:hotelId", (req, res, next) => {
    console.log("Hotel Route Hit");
    next();
}, hotelController.getHotelById);


module.exports = router;