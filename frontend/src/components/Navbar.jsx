import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Search, Menu, UserCircle, LogOut, Heart, Home, List } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-500 tracking-tight">Wanderlust</span>
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-red-500 font-medium transition flex items-center gap-2">
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link to="/listings" className="text-gray-600 hover:text-red-500 font-medium transition flex items-center gap-2">
              <List className="w-4 h-4" /> Listings
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Anywhere • Any week"
                  className="pl-4 pr-10 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 w-64 text-sm transition-all group-hover:shadow-md"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Watchlist Quick-Access Icon */}
            {user && (
              <Link
                to="/watchlist"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-red-500"
                title="Watchlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
            )}

            {/* Auth Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 border border-gray-300 rounded-full py-1.5 px-3 hover:shadow-md transition bg-white"
              >
                <Menu className="w-4 h-4 text-gray-500" />
                <UserCircle className="w-7 h-7 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.1)] border border-gray-100 overflow-hidden py-2 transform origin-top-right transition-all">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100 text-sm text-gray-900">
                        <div className="font-semibold">{user.username}</div>
                        <div className="text-gray-500 truncate">{user.email}</div>
                        <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 capitalize">
                          {user.role} role
                        </div>
                      </div>
                      <Link 
                        to="/watchlist" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Heart className="w-4 h-4" /> Watchlist
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium border-t border-gray-100 transition"
                      >
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
                      >
                        Log in
                      </Link>
                      <Link 
                        to="/signup"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Sign up
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <Link 
                        to="/listings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Explore destinations
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;