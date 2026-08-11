const mongoose = require("mongoose");

const restaturantSchema = new mongoose.Schema({
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    },

    name:String,

    cuisine:String,

    rating:Number,

    averageCost:Number,

    currency:String,

    address:String,

    openingHours:String,

    images:[String],

    specialities:[String]
});
 const Restaurant = mongoose.model("Restaurant", restaturantSchema);
module.exports = Restaurant;