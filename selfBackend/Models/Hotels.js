const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    },

    name:String,

    description:String,

    category:String,

    rating:Number,

    pricePerNight:Number,

    currency:String,

    amenities:[String],

    address:String,

    coordinates:{

        latitude:Number,

        longitude:Number

    },

    images:[String]
});
const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
