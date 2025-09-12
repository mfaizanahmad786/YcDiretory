// app/search/page.tsx
'use client'

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StartupCard from '@/components/StartupCard';
import Link from 'next/link';

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

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(query);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("🔍 Searching for:", searchQuery);
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (response.ok) {
        console.log(`✅ Found ${data.count} results`);
        setResults(data.results || []);
      } else {
        setError(data.error || 'Search failed');
      }
    } catch (error) {
      console.error("💥 Search error:", error);
      setError('Failed to perform search');
    } finally {
      setLoading(false);
    }
  };

  // Search when query parameter changes
  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [query]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-6">
            {query ? `Search results for "${query}"` : 'Search Startups'}
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, description, or category..."
                className="w-full px-4 py-3 pr-12 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        <div className="mb-6">
          {query && !loading && (
            <p className="text-gray-600">
              {results.length > 0 
                ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                : `No results found for "${query}"`
              }
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((startup) => (
              <StartupCard 
                key={startup.id} 
                startup={startup}
              />
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && query && results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No startups found
            </h3>
            <p className="text-gray-600 mb-8">
              Try searching with different keywords or browse all startups.
            </p>
            <Link
              href="/"
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:from-pink-600 hover:to-red-600 transition-all duration-300"
            >
              Browse All Startups
            </Link>
          </div>
        )}

        {/* Search Suggestions */}
        {!query && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Discover Amazing Startups
            </h3>
            <p className="text-gray-600 mb-8">
              Search by title, description, or category to find startups that interest you.
            </p>
            
            {/* Popular Search Terms */}
            <div className="flex flex-wrap justify-center gap-3">
              {['AI', 'Health', 'FinTech', 'Education', 'Sustainability', 'Technology'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchTerm(term);
                    router.push(`/search?q=${encodeURIComponent(term)}`);
                  }}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 hover:border-pink-300 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-xl">Loading search...</div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}