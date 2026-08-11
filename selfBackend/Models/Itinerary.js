const mongoose = require("mongoose");
const iterarySchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    },

    day:Number,

    title:String,

    hotelId:ObjectId,

    activityIds:[ObjectId],

    restaurantIds:[ObjectId],

    estimatedBudget:Number,

    notes:String
});
const Itinerary = mongoose.model("Itinerary", iterarySchema);
module.exports = Itinerary;