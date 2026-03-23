import React, { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "./ListingCard";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/listings")
      .then((res) => {
        console.log(res.data); 
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-16">
      <h1 className="text-3xl font-bold mb-8">
        Popular Destinations
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((item) => (
          <ListingCard key={item._id} listing={item} />
        ))}
      </div>
    </div>
  );
};

export default Listings;