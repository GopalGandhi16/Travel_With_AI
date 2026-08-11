import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  MapPin,
  Clock,
  Wallet,
  Hotel,
  Utensils,
  Sparkles,
  ArrowLeft,
  CalendarDays,
  Users,
  IndianRupee,
} from "lucide-react";

const TripResult = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const trip = location.state?.trip;

  const [activeDay, setActiveDay] = useState(0);

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">
          No trip found
        </h2>

        <button
          onClick={() => navigate("/ai-planner")}
          className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Create New Trip
        </button>
      </div>
    );
  }

  const itinerary = trip.itinerary;

  return (
  <div className="min-h-screen bg-gray-50 pt-28 pb-20">

    <div className="max-w-6xl mx-auto px-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/ai-planner")}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Create Another Trip
      </button>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl"
      >

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            AI Generated Travel Plan
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black">
          Your Trip to {trip.destination}
        </h1>

        <p className="mt-4 text-white/80 text-lg max-w-2xl">
          A personalized itinerary created specially according to
          your preferences, budget and interests.
        </p>

        {/* Trip Info */}
        <div className="flex flex-wrap gap-4 mt-8">

          <div className="flex items-center gap-2 bg-white/15 px-4 py-3 rounded-xl">
            <CalendarDays className="w-5 h-5" />
            <span>
              {trip.startDate} → {trip.endDate}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/15 px-4 py-3 rounded-xl">
            <Users className="w-5 h-5" />
            <span>
              {trip.travellers} Travellers
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/15 px-4 py-3 rounded-xl">
            <Wallet className="w-5 h-5" />
            <span>
              ₹{trip.budget}
            </span>
          </div>

        </div>

      </motion.div>


      {/* Quick Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-5 mt-8"
      >

        {/* Destination */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Destination
              </p>

              <p className="font-bold text-gray-900">
                {trip.destination}
              </p>
            </div>

          </div>

        </div>


        {/* Duration */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Duration
              </p>

              <p className="font-bold text-gray-900">
                {trip.itinerary.days?.length || 0} Days
              </p>
            </div>

          </div>

        </div>


        {/* Estimated Budget */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-emerald-600" />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Estimated Cost
              </p>

              <p className="font-bold text-gray-900">
                ₹{trip.itinerary.estimatedBudget?.total || 0}
              </p>
            </div>

          </div>

        </div>

      </motion.div>

    </div>
    {/* Recommended Hotel */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="mt-10"
>
  <div className="flex items-center gap-3 mb-5">
    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
      <Hotel className="w-5 h-5 text-blue-600" />
    </div>

    <div>
      <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
        Stay Recommendation
      </p>

      <h2 className="text-2xl md:text-3xl font-black text-gray-900">
        Recommended Hotel
      </h2>
    </div>
  </div>

  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

    <div className="p-6 md:p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* Hotel Info */}
        <div className="flex items-start gap-5">

          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Hotel className="w-8 h-8 text-blue-600" />
          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-900">
              {itinerary.recommendedHotel?.name || "Recommended Hotel"}
            </h3>

            <div className="flex items-center gap-2 mt-2">

              <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg text-sm font-bold">
                ⭐ Highly Rated
              </span>

            </div>

            <p className="text-gray-500 mt-3 max-w-xl">
              {itinerary.recommendedHotel?.reason ||
                "Recommended based on your budget and travel preferences."}
            </p>

          </div>

        </div>

        {/* Hotel ID */}
        <div className="text-right">

          <p className="text-xs text-gray-400 mb-2">
            Hotel ID
          </p>

          <p className="text-xs font-mono text-gray-500">
            {itinerary.recommendedHotel?.id || "N/A"}
          </p>

        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-7 pt-6 border-t border-gray-100">

        <button
          onClick={() =>
            navigate(
              `/hotels/${itinerary.recommendedHotel?.id}`
            )
          }
          className="flex-1 border border-blue-200 text-blue-600 hover:bg-blue-50 py-3.5 rounded-xl font-bold transition"
        >
          View Hotel
        </button>

        <button
          onClick={() =>
            navigate(
              `/booking/${itinerary.recommendedHotel?.id}`
            )
          }
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition"
        >
          Book Now
        </button>

      </div>

    </div>

  </div>
</motion.div>
{/* Day Wise Itinerary */}

{/* Day Wise Itinerary */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="mt-12"
>

  {/* Heading */}
  <div className="text-center mb-8">

    <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
      Your Personalized Schedule
    </p>

    <h2 className="text-3xl md:text-4xl font-black text-gray-900">
      AI-Generated{" "}
      <span className="text-blue-600">
        Itinerary
      </span>
    </h2>

    <p className="text-gray-500 mt-3">
      Every day planned according to your interests and preferences.
    </p>

  </div>


  {/* Day Tabs */}
  <div className="flex gap-3 mb-8 overflow-x-auto pb-2">

    {itinerary.days?.map((day, index) => (

      <button
        key={index}
        onClick={() => setActiveDay(index)}
        className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
          activeDay === index
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
        }`}
      >

        <span className="block">
          Day {day.day}
        </span>

        <span
          className={`block text-xs mt-1 ${
            activeDay === index
              ? "text-white/80"
              : "text-gray-400"
          }`}
        >
          {day.title}
        </span>

      </button>

    ))}

  </div>


  {/* Active Day */}
  {itinerary.days?.[activeDay] && (

    <motion.div
      key={activeDay}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >

      {/* Day Title */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-5 border border-blue-100">

        <p className="text-sm font-semibold text-blue-600">
          DAY {itinerary.days[activeDay].day}
        </p>

        <h3 className="text-2xl font-black text-gray-900 mt-1">
          {itinerary.days[activeDay].title}
        </h3>

      </div>


      {/* Activities */}
      <div className="space-y-4">

        {itinerary.days[activeDay].activities?.map(
          (activity, index) => (

            <motion.div
              key={activity.activityId || index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all"
            >

              <div className="flex items-start gap-5">

                {/* Time */}
                <div className="flex-shrink-0 w-20 text-center">

                  <p className="text-sm font-bold text-blue-600">
                    {activity.time}
                  </p>

                  <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400 to-transparent mx-auto mt-2" />

                </div>


                {/* Activity Icon */}
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                  🌍
                </div>


                {/* Activity Details */}
                <div className="flex-1">

                  <h4 className="text-lg font-bold text-gray-900">
                    {activity.name}
                  </h4>

                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {activity.description}
                  </p>

                </div>

              </div>

            </motion.div>

          )
        )}

      </div>


      {/* Restaurant Recommendations */}
      {itinerary.days[activeDay].restaurantRecommendations?.length > 0 && (

        <div className="mt-6">

          <h3 className="text-lg font-bold text-gray-900 mb-3">
            🍽️ Recommended Restaurants
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            {itinerary.days[
              activeDay
            ].restaurantRecommendations.map(
              (restaurant, index) => (

                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
                >

                  <h4 className="font-bold text-gray-900">
                    {restaurant.name}
                  </h4>

                  {restaurant.reason && (
                    <p className="text-sm text-gray-500 mt-2">
                      {restaurant.reason}
                    </p>
                  )}

                </div>

              )
            )}

          </div>

        </div>

      )}

    </motion.div>

  )}

</motion.div>
  </div>
  
);
};

export default TripResult;