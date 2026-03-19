import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-8 bg-white shadow-md fixed top-0 z-50">
      <h1 className="text-2xl font-bold text-red-500">Wanderlust</h1>

      <div className="hidden md:flex gap-6 text-gray-700">
        <p className="hover:text-black cursor-pointer">Explore</p>
        <p className="hover:text-black cursor-pointer">Trips</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;