const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    travellers: {
      type: Number,
      required: true,
      min: 1,
    },

    budget: {
      type: String,
      required: true,
    },

    interests: {
      type: [String],
      default: [],
    },

    hotelPreference: {
      type: String,
      enum: ["Budget", "Standard", "Luxury"],
      default: "Standard",
    },

    foodPreference: {
      type: String,
      default: "Local",
    },

    specialRequest: {
      type: String,
      default: "",
    },

    itinerary: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    estimatedBudget: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);