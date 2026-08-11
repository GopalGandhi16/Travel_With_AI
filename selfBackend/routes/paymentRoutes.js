const express = require("express");

const router = express.Router();

const paymentController = require("../Controllers/paymentController");

router.get("/key", paymentController.getKey);

router.post("/create-order", paymentController.createOrder);

module.exports = router;