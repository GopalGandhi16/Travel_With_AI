import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  // ✅ FIX: function inside component
  const handleWatchlist = async (e) => {
    e.stopPropagation(); // ❗ stop navigation

    try {
      await axios.post(
        `http://localhost:3000/api/user/watchlist/${listing._id}`,
        { userId: "USER_ID" }
      );
      console.log("Added to watchlist");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={() => navigate(`/listing/${listing._id}`)}
      className="relative cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
    >
      {/* Image */}
      <img
        src={listing.image}
        className="w-full h-52 object-cover"
      />

      {/* ❤️ Heart */}
      <FaHeart
        onClick={handleWatchlist}
        className="absolute top-3 right-3 text-white hover:text-red-500 cursor-pointer text-xl"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="font-semibold">{listing.title}</h2>
        <p className="text-gray-500 text-sm">
          {listing.location}, {listing.country}
        </p>
        <p className="font-bold text-red-500">
          ₹{listing.price}
        </p>
      </div>
    </div>
  );
};

export default ListingCard;