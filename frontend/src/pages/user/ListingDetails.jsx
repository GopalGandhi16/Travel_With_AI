import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import HeroSection from "../../components/HeroSection";
import HotelCard from "../../components/HotelCard";
import RestaurantCard from "../../components/RestuarantCard";
import ActivityCard from "../../components/ActivityCard";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

const ListingDetails = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [destination, setDestination] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [activities, setActivities] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");
const [activeReview, setActiveReview] = useState(0);

const prevReview = () => {
  setActiveReview((p) =>
    p === 0 ? reviews.length - 1 : p - 1
  );
};

const nextReview = () => {
  setActiveReview((p) =>
    p === reviews.length - 1 ? 0 : p + 1
  );
};

const review = reviews[activeReview];
  
  useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/destinations/${slug}/reviews`)
    .then((res) => {
      setReviews(res.data.data || []);
    })
    .catch((err) => {
      console.log(err);
    });
}, [slug]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [
        destinationRes,
        hotelsRes,
        restaurantsRes,
        activitiesRes,
      ] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/destinations/${slug}`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/destinations/${slug}/hotels`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/destinations/${slug}/restaurants`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/destinations/${slug}/activities`),
      ]);

      setDestination(destinationRes.data.data);
      setHotels(hotelsRes.data.data);
      setRestaurants(restaurantsRes.data.data);
      setActivities(activitiesRes.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, [slug]);

const handleReviewSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    toast.info("Please login first");
    return;
  }

  if (!comment.trim()) {
    toast.error("Please write your review");
    return;
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/destinations/${slug}/reviews`,
      {
        userId: user._id,
        rating,
        comment,
      }
    );

    setReviews((prev) => [res.data.data, ...prev]);

    setComment("");
    setRating(5);

    toast.success("Review Added Successfully");
  } catch (err) {
    console.log(err.response?.data);

    toast.error(
      err.response?.data?.message || "Failed to add review"
    );
  }
};

  if (!destination) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16 mt-20">

      {/* Hero Section */}
      <HeroSection destination={destination} />

      {/* Hotels */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">🏨 Top Hotels</h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
            />
          ))}
         
        </div>
      </section>

      {/* Restaurants */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            🍽 Popular Restaurants
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))}
        </div>
      </section>

      {/* Activities */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            🎯 Things To Do
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
            />
          ))}
        </div>
        {/* Reviews */}

<div className="mt-24">

  <div className="text-center mb-12">

    <p className="uppercase tracking-widest text-blue-600 font-bold text-sm">
      Traveler Experiences
    </p>

    <h2 className="text-5xl font-black mt-2">
      What Travelers
      <span className="text-blue-600"> Say</span>
    </h2>

    <p className="text-gray-500 mt-3">
      {reviews.length} Verified Reviews
    </p>

  </div>

  {reviews.length === 0 ? (

    <div className="bg-gray-50 rounded-3xl py-20 text-center">

      <h2 className="text-3xl font-bold">
        No Reviews Yet
      </h2>

      <p className="text-gray-500 mt-3">
        Be the first traveler to review this destination.
      </p>

    </div>

  ) : (

    <div className="max-w-4xl mx-auto">

      <AnimatePresence mode="wait">

        <motion.div
          key={review._id}
          initial={{ opacity: 0, y: 20, scale: .96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: .96 }}
          transition={{ duration: .35 }}
          className="relative bg-white rounded-[30px] border shadow-xl p-10 overflow-hidden"
        >

          <Quote
            className="absolute right-8 top-6 text-blue-100"
            size={80}
          />

          <div className="flex items-center gap-1 mb-6">

            {Array.from({
              length: review.rating,
            }).map((_, i) => (

              <Star
                key={i}
                className="text-yellow-400 fill-yellow-400"
                size={22}
              />

            ))}

            <span className="ml-2 font-semibold">
              {review.rating}.0
            </span>

          </div>

          <p className="text-xl leading-9 text-gray-700 italic mb-10">

            "{review.comment}"

          </p>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">

                {review.userId?.username?.charAt(0)}

              </div>

              <div>

                <h3 className="font-bold text-lg">
                  {review.userId?.username}
                </h3>

                <p className="text-sm text-gray-400">

                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}

                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="text-sm text-gray-400">
                Verified Traveler
              </p>

              <p className="font-bold text-blue-600">
                ⭐ {review.rating}/5
              </p>

            </div>

          </div>

        </motion.div>

      </AnimatePresence>

      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          onClick={prevReview}
          className="w-12 h-12 rounded-2xl border flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
        >

          <ChevronLeft />

        </button>

        <div className="flex gap-2">

          {reviews.map((_, i) => (

            <button
              key={i}
              onClick={() => setActiveReview(i)}
              className={`transition-all rounded-full ${
                activeReview === i
                  ? "w-8 h-2.5 bg-blue-600"
                  : "w-2.5 h-2.5 bg-gray-300"
              }`}
            />

          ))}

        </div>

        <button
          onClick={nextReview}
          className="w-12 h-12 rounded-2xl border flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
        >

          <ChevronRight />

        </button>

      </div>

      <div className="flex justify-center gap-3 mt-6">

        {reviews.map((r, i) => (

          <button
            key={r._id}
            onClick={() => setActiveReview(i)}
            className={`w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold transition-all ${
              activeReview === i
                ? "scale-110 ring-2 ring-blue-500 ring-offset-2"
                : "opacity-50"
            }`}
          >

            {r.userId?.username?.charAt(0)}

          </button>

        ))}

      </div>

    </div>

  )}

</div>
{/* ================= ADD REVIEW ================= */}

<div className="mt-24">

    <h2 className="text-4xl font-bold mb-8">
        ✍️ Share Your Experience
    </h2>

    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">

        <form
            onSubmit={handleReviewSubmit}
            className="space-y-8"
        >

            {/* Rating */}

            <div>

                <label className="block text-lg font-semibold mb-3">
                    Your Rating
                </label>

                <div className="flex gap-2">

                    {[1,2,3,4,5].map((star) => (

                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="text-4xl transition hover:scale-110"
                        >

                            {star <= rating ? "⭐" : "☆"}

                        </button>

                    ))}

                </div>

            </div>

            {/* Comment */}

            <div>

                <label className="block text-lg font-semibold mb-3">
                    Review
                </label>

                <textarea
                    rows="6"
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    placeholder="Tell other travelers about your experience..."
                    className="w-full rounded-2xl border border-gray-300 p-5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

            </div>

            {/* Button */}

            <div className="flex justify-end">

                <button
                    type="submit"
                    className="
                        px-10
                        py-4
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        text-white
                        font-semibold
                        hover:scale-105
                        transition
                        shadow-lg
                    "
                >

                    Submit Review

                </button>

            </div>

        </form>

    </div>

</div>
      </section>

    </div>
  );
};

export default ListingDetails;