import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-pink-500 via-pink-600 to-red-500 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern - Vertical Lines */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full pattern"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Badge */}
        <div className="inline-block mb-8">
          <div className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transform -rotate-1 shadow-lg">
            PITCH, VOTE, AND GROW
          </div>
        </div>

        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-white font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">
            <div className="bg-black px-6 py-3 inline-block transform -skew-x-2 mb-2 mx-2">
              PITCH YOUR STARTUP,
            </div>
            <br />
            <div className="bg-black px-6 py-3 inline-block transform skew-x-2 mt-2">
              CONNECT WITH ENTREPRENEURS
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-white text-lg md:text-xl mb-12 max-w-3xl mx-auto font-medium">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="SEARCH STARTUP"
              className="w-full px-6 py-4 text-lg font-bold text-gray-800 bg-white rounded-full border-4 border-black outline-none shadow-lg placeholder-gray-600"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
