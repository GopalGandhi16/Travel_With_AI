const Listing = require("../models/Listing");

// GET all listings
module.exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single listing
module.exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE listing
module.exports.createListing = async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// search locations 
module.exports.searchLocation = async (req, res) => {
  try {
    const { location } = req.params;

    const keywords = location.split(" ");

    const listings = await Listing.find({
      $or: [
        { location: { $regex: keywords.join("|"), $options: "i" } },
        { country: { $regex: keywords.join("|"), $options: "i" } }
      ]
    });

    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};