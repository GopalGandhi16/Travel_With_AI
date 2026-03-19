import React from "react";
import heroImg from "../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="w-full flex justify-center mt-6 px-4">
      
      {/* Main Container */}
      <div className="w-full max-w-6xl h-[75vh] relative rounded-3xl overflow-hidden shadow-2xl">

        {/* Background */}
        <img
          src={heroImg}
          alt="hero"
          className="w-full h-full object-cover scale-105"
        />

        {/* Soft Gradient Overlay (IMPORTANT FIX) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
            Explore the World, <br />
            <span className="text-red-400">Your Way 🌍</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl">
            Discover destinations, plan your journey, and create unforgettable memories.
          </p>

          {/* Floating Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-3 px-5 py-4 w-full max-w-4xl">

            {/* Where */}
            <div className="flex flex-col flex-1 text-left">
              <label className="text-xs text-gray-500 bold">Where</label>
              <input
                type="text"
                placeholder="Search destinations"
                className="outline-none text-sm font-medium"
              />
            </div>

            <div className="hidden md:block w-px h-10 bg-gray-300"></div>

            {/* When */}
            <div className="flex flex-col flex-1 text-left">
              <label className="text-xs text-gray-500">When</label>
              <input
                type="text"
                placeholder="Add dates"
                className="outline-none text-sm font-medium"
              />
            </div>

            <div className="hidden md:block w-px h-10 bg-gray-300"></div>

            {/* Budget */}
            <div className="flex flex-col flex-1 text-left">
              <label className="text-xs text-gray-500">Budget</label>
              <input
                type="text"
                placeholder="Add budget"
                className="outline-none text-sm font-medium"
              />
            </div>

            {/* Button */}
            <button className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition transform hover:scale-105">
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;