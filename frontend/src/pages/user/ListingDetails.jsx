import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!listing) return <h2>Loading...</h2>;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4">
      <img
        src={listing.image}
        className="w-full h-96 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-4">
        {listing.title}
      </h1>

      <p className="text-gray-600 mt-2">
        {listing.location}, {listing.country}
      </p>

      <p className="mt-4 text-lg">
        {listing.description}
      </p>

      <p className="mt-4 text-2xl font-bold text-red-500">
        ₹{listing.price} / night
      </p>
    </div>
  );
};

export default ListingDetails;