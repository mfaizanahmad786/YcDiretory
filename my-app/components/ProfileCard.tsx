import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import decoration from '../public/assets/public/SVG.png';

const ProfileCard = () => {
  return (
    <div className="relative">
      {/* SVG Decoration positioned above top left border */}
      <div className="absolute -top-5 -left-7 z-10">
        <Image 
          src={decoration} 
          alt="Profile Background" 
          width={40} 
          height={40} 
          className="object-contain"
        />
      </div>

      {/* Black shadow div behind NATHAN SMITH - rotated counter-clockwise */}
      <div className="absolute -top-4 left-12 z-10 bg-black px-2 py-2 rounded-2xl border-4 border-black w-fit text-center font-bold text-xl transform -rotate-3">
        <span className="opacity-0">NATHAN SMITH</span>
      </div>

      {/* NATHAN SMITH name badge overlapping the card */}
      <div className="absolute -top-5 left-13 z-20 bg-white text-black px-2 py-2 rounded-2xl border-4 border-black w-fit text-center font-extrabold text-xl shadow-lg">
        NATHAN SMITH
      </div>
 
      <div className="bg-[#EE2B69] rounded-3xl border-4 border-black p-6 text-white relative overflow-hidden shadow-lg mt-3">
        {/* Profile Image */}
        <div className="flex justify-center mb-6 mt-8">
        <div className="w-32 h-32 bg-yellow-200 rounded-full border-4 border-white overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-orange-300 to-yellow-400 flex items-center justify-center">
            {/* Cartoon Character Placeholder */}
            <div className="text-6xl">👨</div>
          </div>
        </div>
      </div>

      {/* Username */}
      <div className="text-center mb-2">
        <h2 className="text-3xl font-extrabold">@nathansmith</h2>
      </div>

      {/* Bio */}
      <div className="text-center mb-6">
        <p className="text-sm opacity-90">Next.js Enthusiast & Educator</p>
      </div>

      {/* Location */}
      <div className="flex items-center justify-center text-sm opacity-90">
        <FaMapMarkerAlt className="mr-2" />
        <span>San Francisco, CA</span>
      </div>

      {/* Stats or additional info can be added here */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="font-bold text-lg">12</div>
            <div className="text-xs opacity-75">Startups</div>
          </div>
          <div>
            <div className="font-bold text-lg">2.5k</div>
            <div className="text-xs opacity-75">Followers</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfileCard;
