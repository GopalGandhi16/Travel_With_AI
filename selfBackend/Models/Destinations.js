const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: String,
  slug: String,
  country: String,
  state: String,
  continent: String,

  description: String,

  heroImage: String,
  gallery: [String],

  coordinates: {
      latitude: Number,
      longitude: Number
  },

  currency: String,

  languages: [String],

  averageBudget: {
      budget: Number,
      standard: Number,
      luxury: Number
  },

  averageTripDays: Number,

  bestSeason: String,

  rating: Number,

  tags: [String],

  famousFor: [String],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},

  reviews: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }
]

});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;