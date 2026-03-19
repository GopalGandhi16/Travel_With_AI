const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    default: "https://media.istockphoto.com/id/1223072133/photo/cityscape-of-a-residential-area-with-modern-apartment-buildings-new-green-urban-landscape-in.jpg",
    set: (v) =>
      v === ""
        ? "https://media.istockphoto.com/id/1223072133/photo/cityscape-of-a-residential-area-with-modern-apartment-buildings-new-green-urban-landscape-in.jpg"
        : v
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  price: Number,
  location: String,
  country: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;