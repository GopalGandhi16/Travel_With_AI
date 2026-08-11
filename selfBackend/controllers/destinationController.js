const Destination = require("../Models/Destinations");
const Hotel = require("../Models/Hotels");
const Restaurant = require("../Models/Restaurants");
const Activity = require("../Models/Activities");
const Review = require("../Models/Reviews");

exports.getAllDestinations = async (req, res) => {
    try {

        const destinations = await Destination.find();

        res.status(200).json({
            success: true,
            count: destinations.length,
            data: destinations
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
exports.getDestinationBySlug = async (req, res) => {

    try {

        const destination = await Destination.findOne({
            slug: req.params.slug
        });

        if (!destination) {

            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });

        }

        res.status(200).json({
            success: true,
            data: destination
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
exports.getHotelsByDestination = async (req, res) => {

    try {

        const destination = await Destination.findOne({
            slug: req.params.slug
        });

        if (!destination) {

            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });

        }

        const hotels = await Hotel.find({
            destinationId: destination._id
        });

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
exports.getRestaurantsByDestination = async (req, res) => {

    try {

        const destination = await Destination.findOne({
            slug: req.params.slug
        });

        if (!destination) {

            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });

        }

        const restaurants = await Restaurant.find({
            destinationId: destination._id
        });

        res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getActivitiesByDestination = async (req, res) => {

    try {

        const destination = await Destination.findOne({
            slug: req.params.slug
        });

        if (!destination) {

            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });

        }

        const activities = await Activity.find({
            destinationId: destination._id
        });

        res.status(200).json({
            success: true,
            count: activities.length,
            data: activities
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.searchDestinations = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const destination = await Destination.findOne({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
        { slug: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } },
      ],
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "No destination found",
      });
    }

    const hotels = await Hotel.find({
      destinationId: destination._id,
    });

    const restaurants = await Restaurant.find({
      destinationId: destination._id,
    });

    const activities = await Activity.find({
      destinationId: destination._id,
    });

    res.status(200).json({
      success: true,
      destination,
      hotels,
      restaurants,
      activities,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getReviewsByDestination = async (req, res) => {
  try {
    const destination = await Destination.findOne({
      slug: req.params.slug,
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    const reviews = await Review.find({
  destinationId: destination._id,
})
.populate("userId", "username")
.sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reviews,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { slug } = req.params;
    const { userId, rating, comment } = req.body;

    const destination = await Destination.findOne({ slug });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // Optional: Prevent multiple reviews by same user
    const existingReview = await Review.findOne({
      userId,
      destinationId: destination._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this destination.",
      });
    }

    const review = await Review.create({
      userId,
      destinationId: destination._id,
      rating,
      comment,
      createdAt: new Date(),
    });

    destination.reviews.push(review._id);
await destination.save();

const populatedReview = await Review.findById(review._id)
  .populate("userId", "username");

res.status(201).json({
  success: true,
  message: "Review added successfully",
  data: populatedReview,
});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};