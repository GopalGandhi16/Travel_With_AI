import { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "../../components/ListingCard";

const Watchlist = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/watchlist/USER_ID")
      .then((res) => setListings(res.data));
  }, []);

  return (
    <div className="mt-20 p-4">
      <h1 className="text-3xl font-bold mb-6">
        Your Watchlist ❤️
      </h1>

      <div className="grid grid-cols-4 gap-6">
        {listings.map((item) => (
          <ListingCard key={item._id} listing={item} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;