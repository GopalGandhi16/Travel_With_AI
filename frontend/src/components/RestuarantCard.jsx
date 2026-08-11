import { Star } from "lucide-react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">

      <img
       src={
    restaurant.images?.length
      ? restaurant.images[0]
      : "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  }
  alt={restaurant.name}
  className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-semibold">
          {restaurant.name}
        </h3>

        <p className="text-gray-500">
          {restaurant.cuisine}
        </p>

        <div className="flex justify-between mt-4">

          <span className="flex items-center gap-1">

            <Star
              size={18}
              fill="gold"
              color="gold"
            />

            {restaurant.rating}

          </span>

          <span className="font-bold">
            ₹{restaurant.priceForTwo}
          </span>

        </div>

      </div>

    </div>
  );
};

export default RestaurantCard;