import { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "../../components/ListingCard";
import { useAuth } from "../../context/AuthContext";
import { HeartCrack } from "lucide-react";

const Watchlist = () => {
  const [listings, setListings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    console.log("User:", user);

    if (user) {
      console.log("Calling API...");

      axios
        .get(`http://localhost:3000/api/auth/watchlist/${user._id}`)
        .then((res) => {
          console.log(res);
          setListings(res.data || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Your Watchlist ❤️
      </h1>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <HeartCrack className="w-16 h-16 mb-4 text-gray-300" />
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Nothing saved yet</h2>
          <p>Click the heart icon on any listing to save it to your watchlist.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {listings.map((item) => (
            <ListingCard key={item._id} listing={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;