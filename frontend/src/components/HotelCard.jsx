import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-[420px]">

      {/* Hotel Image */}
      <img
        src={
          hotel.images?.length
            ? hotel.images[0]
            : "https://images.unsplash.com/photo-1566073771259-6a8506099945"
        }
        alt={hotel.name}
        className="w-full h-52 object-cover"
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        <h3 className="text-xl font-semibold line-clamp-1">
          {hotel.name}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-1 mt-1">
          {hotel.category}
        </p>

        <div className="flex items-center justify-between mt-5">

          <div className="flex items-center gap-1">
            <Star
              size={18}
              fill="gold"
              color="gold"
            />
            <span className="font-medium">
              {hotel.userRating}
            </span>
          </div>

          <span className="text-lg font-bold text-blue-600">
            ₹{hotel.pricePerNight}
          </span>

        </div>

        {/* Push Button to Bottom */}
        <div className="mt-auto pt-6">

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/booking/${hotel._id}`);
            }}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Book Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default HotelCard;