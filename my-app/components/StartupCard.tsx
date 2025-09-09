import React from 'react';
import Link from 'next/link';

interface StartupCardProps {
  startup: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageLink: string | null;
    views: number;
    createdAt: string;
    author: {
      id: string;
      name: string;
      username: string;
      avatar: string | null;
    };
  };
}



const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  // Safety check to prevent rendering with undefined startup data
  if (!startup) {
    return (
      <div className="bg-gray-200 rounded-3xl border-4 border-gray-300 p-4 max-w-sm mx-auto shadow-lg h-full min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="animate-pulse">Loading startup...</div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getAuthorInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTitleInitials = (title: string) => {
    return title
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 4);
  };


  return (
    <Link href={`/startup/${startup.id}`} className="group block h-full">
      <div className="bg-white hover:bg-[#FFE8F0] rounded-3xl border-4 border-black hover:border-[#EE2B69] p-4 max-w-sm mx-auto shadow-lg border-r-8 border-b-8 transition-all duration-300 ease-in-out cursor-pointer h-full min-h-[400px] flex flex-col">
      {/* Header with date and views */}
      <div className="flex justify-between items-center mb-3">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          {formatDate(startup.createdAt)}
        </span>
        <div className="flex items-center gap-1 text-pink-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          <span className="font-medium">{startup.views}</span>
        </div>
      </div>

      {/* Author and Title */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 pr-2">
          <p className="text-gray-600 text-sm mb-1 truncate">{startup.author.name}</p>
          <h3 className="text-xl font-bold text-black line-clamp-2 leading-tight">{startup.title}</h3>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">{getAuthorInitials(startup.author.name)}</span>
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 mb-4">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {startup.description}
        </p>
      </div>

      {/* Image Placeholder */}
      <div className={`bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-2xl h-32 mb-4 flex items-center justify-center flex-shrink-0`}>
        <div className="text-white text-3xl font-bold opacity-80">
          {getTitleInitials(startup.title)}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-gray-600 font-medium text-sm truncate flex-1 pr-2">{startup.category}</span>
        <button className="bg-black text-white px-4 py-1.5 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm cursor-pointer flex-shrink-0">
          Details
        </button>
      </div>
    </div>
    </Link>
  );
};

export default StartupCard;
