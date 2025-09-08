'use client'

import React, { useEffect, useState } from 'react';
import StartupCard from './StartupCard';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface StartupDetailProps {
  startupId: string;
}

interface Startup{
    id: string;
  title: string;
  description: string;
  category: string;
  imageLink: string | null;
  pitch: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
  };
}

const StartupDetail: React.FC<StartupDetailProps> = ({ startupId }) => {
 const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarStartups, setSimilarStartups] = useState<Startup[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        console.log("🔍 Fetching startup with ID:", startupId); // Debug log
        
        const response = await fetch(`/api/startup/${startupId}`);
        const data = await response.json();

        console.log("📦 API Response:", data); // Debug log

        if (response.ok) {
          console.log("✅ Startup fetched successfully:", data.startup);
          setStartup(data.startup);
        } else {
          console.log("❌ Error fetching startup:", data.error);
          setError(data.error || "Startup not found");
        }
      } catch (error) {
        console.error("💥 Network error:", error);
        setError('Failed to load startup');
      } finally {
        setLoading(false); // ← Fixed: Always set loading to false
      }
    };

    if (startupId) {
      fetchStartup(); // ← Fixed: Call outside try/catch
    }
  }, [startupId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error || !startup) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error || 'Startup not found'}
          </h2>
          <p className="text-gray-600 mb-4">
            Startup ID: {startupId}
          </p>
          <Link 
            href="/"
            className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }


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
              {startup ? formatDate(startup.createdAt) : ''}
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-white font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">
              <div className="bg-black px-6 py-3 inline-block transform -skew-x-2">
                  {startup?.title}
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-white text-lg md:text-xl mb-12 max-w-4xl mx-auto font-medium">
            {startup?.description}
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
                <h3 className="text-xl font-bold text-black">{startup?.author.name}</h3>
                <p className="text-gray-600">@{startup?.author.username}</p>
              </div>
            </div>
            <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-bold">
              {startup?.category}
            </div>
          </div>

          {/* Pitch Details */}
          <div className="bg-white rounded-3xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Pitch details</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <div dangerouslySetInnerHTML={{
                __html: (startup?.pitch ?? '').replace(/\n/g, ',br/>')
              }}
              />
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
