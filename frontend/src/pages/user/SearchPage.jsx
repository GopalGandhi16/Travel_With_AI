import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "../../components/ListingCard";

const SearchPage = () => {
  const { location } = useParams();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/listings/search/${location}`)
      .then((res) => setListings(res.data))
      .catch((err) => console.log(err));
  }, [location]);

  return (
    <div className="mt-20 p-4">
      <h2 className="text-2xl font-bold mb-6">
        Results for "{location}"
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {listings.map((item) => (
          <ListingCard key={item._id} listing={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;