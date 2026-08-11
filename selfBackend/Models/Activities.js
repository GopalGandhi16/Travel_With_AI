const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    destinationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
},

    title:String,

    description:String,

    category:String,

    duration:String,

    price:Number,

    currency:String,

    rating:Number,

    images:[String],

    location:{

        address:String,

        latitude:Number,

        longitude:Number

    },

    bestTime:String,

    bookingRequired:Boolean
});
const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;