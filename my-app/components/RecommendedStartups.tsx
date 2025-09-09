'use client'

import React,{useState,useEffect} from 'react';
import StartupCard from './StartupCard';

interface Startup {
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
}


const RecommendedStartups = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedStartups = async () => {
      try {
        console.log("🔍 Fetching recommended startups");
        
        // Fetch all startups from your API
        const response = await fetch('/api/startups');
        const data = await response.json();

        console.log("📦 API Response:", data);

        if (response.ok) {
          // Get the most recent 6 startups for recommendations
          const recommendedStartups = data.startups
            ?.sort((a: Startup, b: Startup) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 6) || [];
          
          console.log(`✅ Found ${recommendedStartups.length} recommended startups`);
          setStartups(recommendedStartups);
        } else {
          console.log("❌ Error fetching startups:", data.error);
          setError(data.error || 'Failed to fetch startups');
        }
      } catch (error) {
        console.error("💥 Network error:", error);
        setError('Failed to load recommended startups');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedStartups();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-12">
            Recommended startups
          </h2>
          
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading recommended startups...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-12">
            Recommended startups
          </h2>
          
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl inline-block">
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (startups.length === 0) {
    return (
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-12">
            Recommended startups
          </h2>
          
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              No startups available yet
            </h3>
            <p className="text-gray-600">
              Be the first to share a startup idea!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-black mb-12">
          Recommended startups
        </h2>
        
        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <StartupCard 
              key={startup.id} 
              startup={startup}
            />
          ))}
        </div>

        {/* View All Button */}
        {startups.length >= 6 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-bold hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg"
            >
              View All Startups →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};


export default RecommendedStartups;
