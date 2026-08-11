const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    },

    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    },

    title:String,

    startDate:Date,

    endDate:Date,

    totalDays:Number,

    travelStyle:String,

    budget:Number,

    travellers:Number,

    status:String,

    aiGenerated:Boolean
});
const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;