import React from 'react';
import Link from 'next/link';

interface StartupCardProps {
  id?: string;
  date?: string;
  views?: number;
  author?: string;
  title?: string;
  description?: string;
  category?: string;
  authorInitials?: string;
  gradientFrom?: string;
  gradientTo?: string;
  placeholderText?: string;
}

const StartupCard: React.FC<StartupCardProps> = ({
  id = "1",
  date = "20 May, 2023",
  views = 232,
  author = "Steven Smith",
  title = "EcoTrack",
  description = "A mobile app that helps users track and reduce their carbon footprint through daily challenges and tips...",
  category = "Senior level",
  authorInitials = "SS",
  gradientFrom = "purple-400",
  gradientTo = "orange-400",
  placeholderText = "ECO"
}) => {
  return (
    <Link href={`/startup/${id}`} className="group block">
      <div className="bg-white hover:bg-[#FFE8F0] rounded-3xl border-4 border-black hover:border-[#EE2B69] p-4 max-w-sm mx-auto shadow-lg border-r-8 border-b-8 transition-all duration-300 ease-in-out cursor-pointer">
      {/* Header with date and views */}
      <div className="flex justify-between items-center mb-3">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          {date}
        </span>
        <div className="flex items-center gap-1 text-pink-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          <span className="font-medium">{views}</span>
        </div>
      </div>

      {/* Author and Title */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-gray-600 text-sm mb-1">{author}</p>
          <h3 className="text-xl font-bold text-black">{title}</h3>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">{authorInitials}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
        {description}
      </p>

      {/* Image Placeholder */}
      <div className={`bg-gradient-to-br from-${gradientFrom} via-pink-400 to-${gradientTo} rounded-2xl h-32 mb-4 flex items-center justify-center`}>
        <div className="text-white text-3xl font-bold opacity-80">
          {placeholderText}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium text-sm">{category}</span>
        <button className="bg-black text-white px-4 py-1.5 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm">
          Details
        </button>
      </div>
    </div>
    </Link>
  );
};

export default StartupCard;
