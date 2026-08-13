import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Users,
  Wallet,
  Hotel,
  Utensils,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const interestsList = [
  "Beaches",
  "Adventure",
  "Nightlife",
  "Nature",
  "Historical",
  "Food",
  "Shopping",
  "Relaxation",
];


const TravelPlanner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tripResult, setTripResult] = useState(null);
const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travellers: 2,
    budget: "",
    interests: [],
    hotelPreference: "Standard",
    foodPreference: "Local",
    specialRequest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/trips/generate`,
  {
    userId: user?._id,
    ...formData,
  }
);

console.log("Trip Response:", response.data);

navigate("/trip-result", {
  state: {
    trip: response.data.data,
  },
});

  } catch (error) {
    console.log("Trip Generation Error:", error);

    alert(
      error.response?.data?.message ||
      "Something went wrong while generating your trip."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-12">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-5">
          <Sparkles className="w-4 h-4" />
          AI Powered Travel Planning
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Plan Your Perfect Trip
        </h1>

        <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
          Tell us what you want and our AI will create a personalized
          itinerary based on your preferences and budget.
        </p>

      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-6">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-10"
        >

          {/* Destination */}
          <div className="mb-8">

            <label className="flex items-center gap-2 text-lg font-semibold mb-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              Where do you want to go?
            </label>

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g. Goa, Manali, Paris..."
              className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          {/* Dates + Travellers */}
          <div className="grid md:grid-cols-3 gap-5 mb-8">

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <CalendarDays className="w-5 h-5 text-blue-600" />
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <CalendarDays className="w-5 h-5 text-blue-600" />
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                Travellers
              </label>

              <input
                type="number"
                name="travellers"
                min="1"
                value={formData.travellers}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Budget */}
          <div className="mb-8">

            <label className="flex items-center gap-2 text-lg font-semibold mb-3">
              <Wallet className="w-5 h-5 text-blue-600" />
              What's your budget?
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {[
                "₹10,000 - ₹20,000",
                "₹20,000 - ₹40,000",
                "₹40,000+",
              ].map((budget) => (

                <button
                  type="button"
                  key={budget}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      budget,
                    }))
                  }
                  className={`p-4 rounded-xl border text-left transition ${
                    formData.budget === budget
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <span className="font-semibold">
                    {budget}
                  </span>
                </button>

              ))}

            </div>

          </div>

          {/* Interests */}
          <div className="mb-8">

            <label className="text-lg font-semibold mb-3 block">
              What are you interested in?
            </label>

            <div className="flex flex-wrap gap-3">

              {interestsList.map((interest) => (

                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-5 py-2.5 rounded-full border transition ${
                    formData.interests.includes(interest)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 text-gray-600 hover:border-blue-400"
                  }`}
                >
                  {interest}
                </button>

              ))}

            </div>

          </div>

          {/* Preferences */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">

            {/* Hotel */}
            <div>

              <label className="flex items-center gap-2 font-semibold mb-3">
                <Hotel className="w-5 h-5 text-blue-600" />
                Hotel Preference
              </label>

              <select
                name="hotelPreference"
                value={formData.hotelPreference}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Budget</option>
                <option>Standard</option>
                <option>Luxury</option>
              </select>

            </div>

            {/* Food */}
            <div>

              <label className="flex items-center gap-2 font-semibold mb-3">
                <Utensils className="w-5 h-5 text-blue-600" />
                Food Preference
              </label>

              <select
                name="foodPreference"
                value={formData.foodPreference}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Local</option>
                <option>Indian</option>
                <option>Vegetarian</option>
                <option>Non-Vegetarian</option>
                <option>Any</option>
              </select>

            </div>

          </div>

          {/* Special Request */}
          <div className="mb-10">

                   <label className="font-semibold text-lg mb-3 block">
          Anything else you want?
        </label>

        <textarea
          name="specialRequest"
          value={formData.specialRequest}
          onChange={handleChange}
          rows="4"
          placeholder="Example: I want more nightlife, avoid crowded places, family friendly activities..."
          className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2 transition"
      >
        <Sparkles className="w-5 h-5" />

        {loading ? "Creating Your Trip..." : "Generate My Trip"}

        {!loading && <ChevronRight className="w-5 h-5" />}
      </button>

    </form>

  </div>
  </div>
);

};

export default TravelPlanner;