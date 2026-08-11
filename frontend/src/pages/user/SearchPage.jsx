import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "../../components/ListingCard";
import HotelCard from "../../components/HotelCard";
import RestaurantCard from "../../components/RestuarantCard";
import ActivityCard from "../../components/ActivityCard";
import { Search } from "lucide-react";

const SearchPage = () => {
  const { location } = useParams();

  const [destination, setDestination] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:3000/api/destinations/search?q=${location}`)
      .then((res) => {
         console.log(res.data);
        setDestination(res.data.destination);
        setHotels(res.data.hotels);
        setRestaurants(res.data.restaurants);
        setActivities(res.data.activities);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [location]);

  if (loading) {
    return (
      <div className="mt-28 text-center text-2xl font-semibold">
        Searching...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-24 px-6 pb-20">

      {/* Header */}

      <div className="flex items-center gap-3 mb-10">
        <Search size={32} />
        <div>
          <h1 className="text-4xl font-bold">
            Search Results
          </h1>

          <p className="text-gray-500 text-lg">
            Showing results for "{location}"
          </p>
        </div>
      </div>

      {/* Destination */}

      {destination && (
        <>
          <h2 className="text-3xl font-bold mb-6">
            📍 Destination
          </h2>

          <div className="max-w-md">
  <ListingCard listing={destination} />
</div>
        </>
      )}

      {/* Hotels */}

      {hotels.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-14 mb-6">
            <h2 className="text-3xl font-bold">
              🏨 Hotels
            </h2>

            <span className="text-gray-500">
              {hotels.length} Found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
              />
            ))}
          </div>
        </>
      )}

      {/* Restaurants */}

      {restaurants.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-16 mb-6">
            <h2 className="text-3xl font-bold">
              🍽 Restaurants
            </h2>

            <span className="text-gray-500">
              {restaurants.length} Found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
              />
            ))}
          </div>
        </>
      )}

      {/* Activities */}

      {activities.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-16 mb-6">
            <h2 className="text-3xl font-bold">
              🎯 Things To Do
            </h2>

            <span className="text-gray-500">
              {activities.length} Found
            </span>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
              />
            ))}
          </div>
        </>
      )}

      {!destination &&
        hotels.length === 0 &&
        restaurants.length === 0 &&
        activities.length === 0 && (
          <div className="text-center py-24">
            <h2 className="text-4xl font-bold">
              😔 No Results Found
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Try searching another destination.
            </p>
          </div>
        )}
    </div>
  );
};

export default SearchPage;