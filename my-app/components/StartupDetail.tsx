import React from 'react';
import StartupCard from './StartupCard';

interface StartupDetailProps {
  startupId: string;
}

const StartupDetail: React.FC<StartupDetailProps> = ({ startupId }) => {
  return (
    <div className="w-full">
      {/* Hero Section with vertical lines pattern */}
      <section className="w-full bg-gradient-to-br from-pink-500 via-pink-600 to-red-500 min-h-[60vh] flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern - Vertical Lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full pattern"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Date Badge */}
          <div className="inline-block mb-8">
            <div className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transform -rotate-1 shadow-lg">
              OCTOBER 5, 2024
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-white font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">
              <div className="bg-black px-6 py-3 inline-block transform -skew-x-2">
                JSM ACADEMY MASTERCLASS
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-white text-lg md:text-xl mb-12 max-w-4xl mx-auto font-medium">
            An online platform offering project-based learning for web developers, aimed at leveling up junior 
            to mid-level developers by focusing on real-world applications.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Course Promo Card */}
    

          {/* Author Info */}
          <div className="flex items-center justify-between mb-8 bg-whites">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">AH</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Adrian Hajdin - JS Mastery</h3>
                <p className="text-gray-600">@adrianhajdin</p>
              </div>
            </div>
            <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-bold">
              Education
            </div>
          </div>

          {/* Pitch Details */}
          <div className="bg-white rounded-3xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Pitch details</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                <strong>EcoCart</strong> is an innovative e-commerce platform designed for eco-conscious 
                shoppers looking to make a <strong>positive environmental</strong> impact with their purchases.
              </p>
              
              <p className="mb-4">
                We connect users with local businesses that offer <strong>eco-friendly</strong>, sustainable 
                products across categories like home goods, fashion, beauty, and more.
              </p>
              
              <p className="mb-4">
                By partnering with small and medium-sized enterprises committed to sustainability, we aim to 
                reduce carbon footprints and <strong>promote greener consumer choices</strong>.
              </p>
              
              <p className="mb-4">
                Our platform not only <strong>helps users find ethically</strong> sourced and 
                <strong> environmentally responsible</strong> products but also offers features like carbon 
                offset tracking, <strong>green certifications</strong>, and <strong>personalized sustainability goals</strong>.
              </p>
              
              <p className="mb-4">
                EcoCart is built to <strong>encourage mindful shopping</strong>, making it easier for people to 
                reduce waste, support local communities, and contribute to a more <strong>sustainable</strong> future.
              </p>
              
              <p className="font-semibold">
                Our mission is simple: <strong>Shop better, live better, and create a greener world—one 
                purchase at a time</strong>.
              </p>
            </div>
          </div>

          {/* Similar Startups Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-8">Similar startups</h2>
            <div className="flex justify-center">
              <StartupCard 
                id="2"
                title="Geovaine"
                author="Steven Smith"
                category="Senior level"
                authorInitials="SS"
                placeholderText="GEO"
                gradientFrom="blue-400"
                gradientTo="purple-400"
                description="A mobile app that helps users track and reduce their carbo and..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;
