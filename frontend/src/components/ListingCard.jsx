import { useNavigate } from "react-router-dom";
import { Heart, Star, Calendar } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleWatchlist = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.info("Please login to add to watchlist");
      return;
    }

    try {
 await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/watchlist/${listing._id}`,
  {
    userId: user._id,
  }
);
toast.success("Added to watchlist");
}catch (err) {
  console.log(err.response?.status);
  console.log(err.response?.data);

  toast.error(err.response?.data?.message || "Failed");
}
  };


  return (
  <div
  onClick={() => navigate(`/destinations/${listing.slug}`)}
  className="
    group
    cursor-pointer
    flex
    flex-col
    overflow-hidden
    rounded-2xl
    border
    border-gray-200
    bg-white
    shadow-sm
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    duration-300
  "
>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200">
        <img
          src={listing.heroImage}
          alt={listing.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={handleWatchlist}
          className="absolute top-3 right-3 text-white hover:scale-110 transition"
        >
          <Heart className="w-6 h-6 drop-shadow-md" />
        </button>
      </div>

      {/* Details */}
      <div className="space-y-2 p-4">

        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg truncate">
            {listing.name}
          </h2>

          <div className="flex items-center gap-1">
            <Star size={16} fill="gold" stroke="gold" />
            <span className="text-sm font-medium">
              {listing.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          {listing.country}
        </p>

        <div className="flex flex-wrap gap-2">
          {listing.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">

          <div className="font-semibold text-blue-600">
            ₹{listing.averageBudget?.budget?.toLocaleString("en-IN")}
          </div>

          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <Calendar size={15} />
            {listing.averageTripDays} Days
          </div>

        </div>

        <div className="text-xs text-green-600 font-medium">
          Best Season: {listing.bestSeason}
        </div>

      </div>
    </div>
  );
};

export default ListingCard;