// components/FloatingViewsCompact.tsx
'use client'

import React from 'react';

interface FloatingViewsCompactProps {
  views: number;
}

const FloatingViewsCompact: React.FC<FloatingViewsCompactProps> = ({ views }) => {
  const formatViews = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 ">
      <div className="rounded-xl shadow-md px-3 py-2 flex items-center gap-2 bg-pink-100">
        {/* Pink Dot */}
        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
        
        {/* Views Text */}
        <span className="text-gray-900  font-bold text-sm">
          {formatViews(views)} Views
        </span>
      </div>
    </div>
  );
};

export default FloatingViewsCompact;