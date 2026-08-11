import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Search, Menu, X, LogOut, Heart, Bell, ChevronDown, Sparkles, Globe, CalendarCheck
} from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "AI Planner", to: "/plan-trip" },
  { label: "My Trips", to: "/watchlist" },
  { label: "About", to: "/" },
];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // On home page: transparent until scroll. On all other pages: always solid.
  const isHomePage = location.pathname === "/";
  const isSolid = !isHomePage || scrolled;

  // Track scroll for blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    // Reset scroll state when route changes
    setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

 const handleSearch = (e) => {
  e.preventDefault();

  if (search.trim()) {
    navigate(`/destinations/search/${search}`);
    setIsSearchOpen(false);
    setSearch("");
  }
};

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-navbar border-b border-gray-100/80"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform duration-200">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-secondary" : "text-white"}`}>
                  Wanderlust<span className="gradient-text-brand">AI</span>
                </span>
                <span className={`text-[9px] font-medium tracking-widest uppercase transition-colors duration-300 ${scrolled ? "text-gray-400" : "text-white/60"}`}>
                  Travel Planner
                </span>
              </div>
            </Link>

            {/* ── Center Nav (Desktop) ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? scrolled
                        ? "text-brand-500 bg-brand-50"
                        : "text-white bg-white/15"
                      : scrolled
                        ? "text-gray-600 hover:text-brand-500 hover:bg-gray-50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label === "AI Planner" && (
                    <Sparkles className="inline w-3 h-3 mr-1 mb-0.5" />
                  )}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">

              {/* Search Icon */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    scrolled
                      ? "text-gray-500 hover:bg-gray-100 hover:text-brand-500"
                      : "text-white/80 hover:bg-white/15 hover:text-white"
                  }`}
                  title="Search"
                >
                  <Search className="w-[18px] h-[18px]" />
                </button>

                {/* Floating search dropdown */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-12 w-80 glass-card p-3 shadow-float"
                    >
                      <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search destinations..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="flex-1 outline-none text-sm text-gray-700 bg-transparent placeholder-gray-400"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 btn-gradient text-white text-xs font-semibold rounded-lg"
                        >
                          Go
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bell (notifications) */}
              <button
                className={`hidden md:flex w-9 h-9 rounded-xl items-center justify-center transition-all duration-200 relative ${
                  scrolled
                    ? "text-gray-500 hover:bg-gray-100 hover:text-brand-500"
                    : "text-white/80 hover:bg-white/15 hover:text-white"
                }`}
                title="Notifications"
              >
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white/50" />
              </button>

              {/* Watchlist heart */}
              {user && (
  <>
    {/* Watchlist */}
    <Link
      to="/watchlist"
      className={`hidden md:flex w-9 h-9 rounded-xl items-center justify-center transition-all duration-200 ${
        scrolled
          ? "text-gray-500 hover:bg-gray-100 hover:text-brand-500"
          : "text-white/80 hover:bg-white/15 hover:text-white"
      }`}
      title="Watchlist"
    >
      <Heart className="w-5 h-5" />
    </Link>

    {/* My Bookings */}
    <Link
      to="/my-bookings"
      className={`hidden md:flex w-9 h-9 rounded-xl items-center justify-center transition-all duration-200 ${
        scrolled
          ? "text-gray-500 hover:bg-gray-100 hover:text-brand-500"
          : "text-white/80 hover:bg-white/15 hover:text-white"
      }`}
      title="My Bookings"
    >
      <CalendarCheck className="w-5 h-5" />
    </Link>
  </>
)}
              

              {/* Auth Buttons or User Dropdown */}
              {!user ? (
                <div className="hidden md:flex items-center gap-2 ml-1">
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      scrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white/90 hover:bg-white/15"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-xl text-sm font-semibold btn-gradient text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="relative hidden md:block" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border transition-all duration-200 ${
                      scrolled
                        ? "border-gray-200 bg-white text-gray-700 hover:border-brand-300 hover:shadow-sm"
                        : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center text-white text-xs font-bold uppercase">
                      {user.username?.charAt(0) || "U"}
                    </div>
                    <span className="text-sm font-medium max-w-[80px] truncate">{user.username}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 glass-card shadow-float overflow-hidden py-2"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold uppercase">
                              {user.username?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-gray-900">{user.username}</p>
                              <p className="text-xs text-gray-500 truncate">{user.email}</p>
                              <span className="mt-0.5 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-brand-50 text-brand-600 capitalize">
                                {user.role} role
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link
                          to="/watchlist"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-brand-500" /> Watchlist
                        </Link>
                        <Link
  to="/my-bookings"
  className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
    scrolled
      ? "text-gray-500 hover:bg-gray-100 hover:text-brand-500"
      : "text-white/80 hover:bg-white/15 hover:text-white"
  }`}
  title="My Bookings"
>
  <CalendarCheck className="w-4 h-4" />
  My Bookings
</Link>


                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                        >
                          <LogOut className="w-4 h-4" /> Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/15"
                }`}
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
            >
              <div className="section-container py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(link.to)
                        ? "bg-brand-50 text-brand-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label === "AI Planner" && <Sparkles className="w-4 h-4" />}
                    {link.label}
                  </Link>
                ))}

                <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
                  {!user ? (
                    <>
                      <Link to="/login" className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-center">
                        Login
                      </Link>
                      <Link to="/signup" className="px-4 py-3 rounded-xl text-sm font-semibold btn-gradient text-white text-center">
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold uppercase text-sm">
                          {user.username?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{user.username}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Link to="/watchlist" className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Heart className="w-4 h-4" /> Watchlist
                      </Link>
                      <Link to="/watchlist" className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        My Bookings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;