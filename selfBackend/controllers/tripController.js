const { GoogleGenAI } = require("@google/genai");

const Destination = require("../Models/Destinations");
const Hotel = require("../Models/Hotels");
const Restaurant = require("../Models/Restaurants");
const Activity = require("../Models/Activities");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateTrip = async (req, res) => {
  try {
    const {
      userId,
      destination,
      startDate,
      endDate,
      travellers,
      budget,
      interests,
      hotelPreference,
      foodPreference,
      specialRequest,
    } = req.body;

    // --------------------------------
    // 1. Validate required fields
    // --------------------------------

    if (
      !userId ||
      !destination ||
      !startDate ||
      !endDate ||
      !travellers ||
      !budget
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required details",
      });
    }

    // --------------------------------
    // 2. Find destination
    // --------------------------------

    const destinationData = await Destination.findOne({
      name: { $regex: `^${destination}$`, $options: "i" },
    });

    if (!destinationData) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // --------------------------------
    // 3. Calculate trip duration
    // --------------------------------

    const inDate = new Date(startDate);
    const outDate = new Date(endDate);

    const days = Math.ceil(
      (outDate - inDate) / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid travel dates",
      });
    }

    // --------------------------------
    // 4. Fetch REAL hotels
    // --------------------------------

    const hotels = await Hotel.find({
      destinationId: destinationData._id,
    }).lean();

    // --------------------------------
    // 5. Fetch REAL restaurants
    // --------------------------------

    const restaurants = await Restaurant.find({
      destinationId: destinationData._id,
    }).lean();

    // --------------------------------
    // 6. Fetch REAL activities
    // --------------------------------

    const activities = await Activity.find({
      destinationId: destinationData._id,
    }).lean();

    // --------------------------------
    // 7. Check available data
    // --------------------------------

    if (
      hotels.length === 0 &&
      restaurants.length === 0 &&
      activities.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "No hotels, restaurants or activities found for this destination",
      });
    }

    // --------------------------------
    // 8. Prepare database data for AI
    // --------------------------------

    const availableHotels = hotels.map((hotel) => ({
      id: hotel._id,
      name: hotel.name,
      category: hotel.category,
      rating: hotel.userRating,
      pricePerNight: hotel.pricePerNight,
      amenities: hotel.amenities,
    }));

    const availableRestaurants = restaurants.map((restaurant) => ({
      id: restaurant._id,
      name: restaurant.name,
      category: restaurant.category,
      rating: restaurant.rating,
      cuisine: restaurant.cuisine,
      priceRange: restaurant.priceRange,
    }));

    const availableActivities = activities.map((activity) => ({
      id: activity._id,
      name: activity.name,
      description: activity.description,
      category: activity.category,
      price: activity.price,
      duration: activity.duration,
    }));

    // --------------------------------
    // 9. Gemini Prompt
    // --------------------------------

    const prompt = `
You are an expert AI travel planner.

Create a personalized travel itinerary using ONLY the
hotels, restaurants and activities provided below.

USER INFORMATION
----------------
Destination: ${destination}
Number of days: ${days}
Travellers: ${travellers}
Budget: ${budget}
Interests: ${interests?.join(", ") || "Not specified"}
Hotel preference: ${hotelPreference || "Standard"}
Food preference: ${foodPreference || "Local"}
Special request: ${specialRequest || "None"}


AVAILABLE HOTELS
----------------
${JSON.stringify(availableHotels, null, 2)}


AVAILABLE RESTAURANTS
----------------
${JSON.stringify(availableRestaurants, null, 2)}


AVAILABLE ACTIVITIES
----------------
${JSON.stringify(availableActivities, null, 2)}


IMPORTANT RULES
---------------

1. ONLY recommend hotels from AVAILABLE HOTELS.

2. ONLY recommend restaurants from AVAILABLE RESTAURANTS.

3. ONLY recommend activities from AVAILABLE ACTIVITIES.

4. NEVER invent a hotel.

5. NEVER invent a restaurant.

6. NEVER invent an activity.

7. NEVER create fake IDs.

8. Use the exact IDs provided in the database.

9. If there are not enough options, reuse suitable activities/restaurants
   instead of inventing new ones.

10. Match recommendations with the user's interests and budget.

11. Prefer highly rated hotels and restaurants when appropriate.

12. Keep the itinerary realistic.

13. Return ONLY valid JSON.

14. Do NOT use markdown.

15. Do NOT use code fences.


RETURN THIS EXACT JSON STRUCTURE:

{
  "destination": "",
  "recommendedHotel": {
    "id": "",
    "name": "",
    "reason": ""
  },
  "days": [
    {
      "day": 1,
      "title": "",
      "activities": [
        {
          "activityId": "",
          "name": "",
          "time": "",
          "description": "",
          "estimatedCost": 0
        }
      ],
      "restaurantRecommendations": [
        {
          "restaurantId": "",
          "name": "",
          "reason": ""
        }
      ]
    }
  ],
  "estimatedBudget": {
    "hotel": 0,
    "food": 0,
    "activities": 0,
    "transport": 0,
    "total": 0
  },
  "travelTips": []
}
`;

    // --------------------------------
    // 10. Call Gemini
    // --------------------------------

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    // --------------------------------
    // 11. Get AI response
    // --------------------------------

    let aiText = response.text;

    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // --------------------------------
    // 12. Parse JSON
    // --------------------------------

    let itinerary;

    try {
      itinerary = JSON.parse(aiText);
    } catch (error) {
      console.log("Gemini Raw Response:");
      console.log(aiText);

      return res.status(500).json({
        success: false,
        message: "AI returned an invalid JSON response",
      });
    }

    // --------------------------------
    // 13. Return final result
    // --------------------------------

    return res.status(200).json({
      success: true,

      message: "Personalized trip generated successfully",

      data: {
        userId,
        destinationId: destinationData._id,
        destination,
        startDate,
        endDate,
        travellers,
        budget,
        interests,
        hotelPreference,
        foodPreference,
        specialRequest,

        availableOptions: {
          hotels: hotels.length,
          restaurants: restaurants.length,
          activities: activities.length,
        },

        itinerary,
      },
    });

  } catch (error) {
    console.log("Generate Trip Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};