import React from 'react';
import StartupCard from './StartupCard';

const RecommendedStartups = () => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-black mb-12">
          Recommended startups
        </h2>
        
        {/* Single Startup Card */}
        <div className="flex justify-center">
          <StartupCard id="1" />
        </div>
      </div>
    </section>
  );
};

export default RecommendedStartups;
