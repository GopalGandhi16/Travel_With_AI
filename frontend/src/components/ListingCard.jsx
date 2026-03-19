import React from "react";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">

      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {listing.title}
        </h2>

        <p className="text-gray-500 text-sm">
          {listing.location}, {listing.country}
        </p>

        <p className="mt-2 font-bold text-red-500">
          ₹{listing.price} / night
        </p>
      </div>
    </div>
  );
};

export default ListingCard;