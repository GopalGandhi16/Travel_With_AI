import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaList, FaHeart, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // later auth se aayega
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
    }
  };

  return (
    <div className="fixed top-0 w-full bg-white shadow-md z-50 px-6 py-3 flex items-center justify-between">

      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold text-red-500">
        Wanderlust
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6 text-gray-700 font-medium">

        <Link to="/" className="flex items-center gap-2 hover:text-red-500 transition">
          <FaHome /> Home
        </Link>

        <Link to="/" className="flex items-center gap-2 hover:text-red-500 transition">
          <FaList /> All Listings
        </Link>

        <Link to="/watchlist" className="flex items-center gap-2 hover:text-red-500 transition">
          <FaHeart /> Watchlist
        </Link>

      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3 shadow-sm">
        <input
          type="text"
          placeholder="Search location..."
          className="bg-transparent outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="text-red-500 font-semibold"
        >
          Search
        </button>
      </div>

      {/* AUTH SECTION */}
      <div>
        {isLoggedIn ? (
          <Link to="/profile" className="flex items-center gap-2 hover:text-red-500">
            <FaUser /> Profile
          </Link>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-red-500">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;