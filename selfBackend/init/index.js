require("dotenv").config();
const mongoose = require("mongoose");

// Models
const Destination = require("../Models/Destinations");
const Activity = require("../Models/Activities");
const Hotel = require("../Models/Hotels");
const Restaurant = require("../Models/Restaurants");
const Review = require("../Models/Reviews");
const User = require("../Models/UserModel");

// JSON Data
const destinations = require("../data/destination.json");
const activities = require("../data/activites_updated.json");
const hotels = require("../data/hotels_updated.json");
const restaurants = require("../data/restaurants_updated.json");
const reviews = require("../data/reviews.json");

// MongoDB URI
const MONGO_URL = process.env.MONGO_URI;
// Atlas use kar rahe ho to yaha Atlas URI daal dena.

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("✅ MongoDB Connected");

    // Delete Old Data
    await Destination.deleteMany({});
    await Activity.deleteMany({});
    await Hotel.deleteMany({});
    await Restaurant.deleteMany({});
    await Review.deleteMany({});

    console.log("🗑 Old data deleted");

    // Insert Destinations
    const insertedDestinations = await Destination.insertMany(destinations);

    console.log("✅ Destinations Inserted");
    console.log(insertedDestinations[0]);
console.log(hotels[0]);
console.log(insertedDestinations[0]);
console.log(hotels[0]);

    // destinationSlug -> ObjectId Map
    const destinationMap = {};

    insertedDestinations.forEach((destination) => {
      destinationMap[destination.slug] = destination._id;
    });

    // Activities
    const activityDocs = activities.map((activity) => ({
      ...activity,
      destinationId: destinationMap[activity.destinationSlug]
    }));

    // Hotels
    hotels.forEach((hotel) => {
  if (!destinationMap[hotel.destinationSlug]) {
    console.log("❌ Missing destination:", hotel.destinationSlug);
  }
});
console.log("Destination Map Keys:");
console.log(Object.keys(destinationMap));
    const hotelDocs = hotels.map((hotel) => ({
      ...hotel,
      destinationId: destinationMap[hotel.destinationSlug]
    }));

    // Restaurants
    restaurants.forEach((restaurant) => {
  if (!destinationMap[restaurant.destinationSlug]) {
    console.log(
      "❌ Missing destination (Restaurant):",
      restaurant.destinationSlug,
      "->",
      restaurant.name
    );
  }
});
    const restaurantDocs = restaurants.map((restaurant) => ({
      ...restaurant,
      destinationId: destinationMap[restaurant.destinationSlug]
    }));

    // Reviews
    const mockUserNames = ["Rahul", "Priya", "Amit", "Sneha", "Rohit"];
    const userMap = {};

    for (const name of mockUserNames) {
      let user = await User.findOne({ username: name });
      if (!user) {
        user = await User.create({
          username: name,
          email: `${name.toLowerCase()}@test.com`,
          password: "password123",
          role: "user"
        });
      }
      userMap[name] = user._id;
    }

    const reviewDocs = reviews.map((review) => {
      const destinationId = destinationMap[review.destinationSlug];

      if (!destinationId) {
        throw new Error(
          `Review has invalid destinationSlug '${review.destinationSlug}'`
        );
      }

      const userId = userMap[review.userName] || userMap["Rahul"];

      return {
        userId,
        destinationId,
        rating: review.rating,
        comment: review.comment,
        createdAt: new Date(),
      };
    });

    await Activity.insertMany(activityDocs);
    console.log("✅ Activities Inserted");

    await Hotel.insertMany(hotelDocs);
    console.log("✅ Hotels Inserted");

    await Restaurant.insertMany(restaurantDocs);
    console.log("✅ Restaurants Inserted");

    await Review.insertMany(reviewDocs);
    console.log("✅ Reviews Inserted");

    console.log("\n🎉 Database Seeded Successfully!");

    mongoose.connection.close();

  } catch (err) {
    console.log(err);
  }
}

seedDatabase();