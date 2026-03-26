import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
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
        `http://localhost:3000/api/auth/watchlist/${listing._id}`,
        { userId: user._id }
      );
      toast.success("Added to watchlist");
    } catch (err) {
      toast.error("Failed to add to watchlist");
    }
  };

  return (
    <div
      onClick={() => navigate(`/listing/${listing._id}`)}
      className="group cursor-pointer flex flex-col gap-2"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200">
        <img
          src={listing.image}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
          alt={listing.title}
        />
        <button 
          onClick={handleWatchlist}
          className="absolute top-3 right-3 text-white hover:scale-110 active:scale-95 transition-transform"
        >
          <Heart className="w-6 h-6 drop-shadow-md" strokeWidth={2} />
        </button>
      </div>

      <div className="flex flex-col mt-1">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-gray-900 truncate pr-4 text-base">{listing.location}, {listing.country}</h2>
        </div>
        <p className="text-gray-500 text-sm truncate">{listing.title}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-semibold text-gray-900">₹{listing.price?.toLocaleString("en-IN")}</span>
          <span className="text-gray-600 text-sm">night</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;