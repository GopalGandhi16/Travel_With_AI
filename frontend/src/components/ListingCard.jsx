import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/listing/${listing._id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
    >
      <img src={listing.image} className="w-full h-52 object-cover" />

      <div className="p-4">
        <h2 className="font-semibold">{listing.title}</h2>
        <p className="text-gray-500 text-sm">
          {listing.location}, {listing.country}
        </p>
        <p className="font-bold text-red-500">₹{listing.price}</p>
      </div>
    </div>
  );
};
export default ListingCard;