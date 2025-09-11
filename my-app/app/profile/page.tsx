'use client'

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useSession } from 'next-auth/react';

// If the file exists at the correct path, ensure the filename and extension are correct.
// Otherwise, update the import path to the correct location, for example:
import ProfileCard from '../../components/ProfileCard';
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

const ProfilePage = () => {

    const [startups, setStartups] = useState<Startup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchUserStartups = async () => {
            try {
                if (!session?.user?.id) return

                const response = await fetch(`/api/startups?authorId=${session.user.id}`)
                const data = await response.json()

                if (response.ok) {
                    setStartups(data.startups || [])
                } else {
                    setError(data.error || "Failed to fetch startups")
                }
            } catch (error) {
                console.log(error)
                setError("Failed to fetch startups")
            } finally {
                setLoading(false)
            }
        }

        if (status === "authenticated" && session?.user?.id) {
            fetchUserStartups()
        } else if (status === "unauthenticated") {
            setLoading(false)
        }
    }, [session, status])

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Please sign in to view your profile
                        </h2>
                        <Link
                            href="/api/auth/signin"
                            className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-gray-50">
            <div className='border-b-3'>
                <Header />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left side - Profile Card */}
                    <div className="lg:col-span-1">
                        <ProfileCard />
                    </div>

                    {/* Right side - Startup Cards Grid */}
                    <div className="lg:col-span-3">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-black">Your Startups</h2>
                                <p className="text-gray-600">
                                    {startups.length} startup{startups.length !== 1 ? 's' : ''} shared
                                </p>
                            </div>
                            <Link
                                href="/create"
                                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:from-pink-600 hover:to-red-600 transition-all duration-300"
                            >
                                + Add New Startup
                            </Link>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading your startups...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                                {error}
                            </div>
                        )}
                        {!loading && !error && (
                            <>
                                {startups.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {startups.map((startup) => (
                                            <StartupCard
                                                key={startup.id}
                                                startup={startup}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            No startups yet
                                        </h3>
                                        <p className="text-gray-600 mb-8">
                                            Share your first startup idea with the world!
                                        </p>
                                        <Link
                                            href="/create"
                                            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:from-pink-600 hover:to-red-600 transition-all duration-300"
                                        >
                                            Create Your First Startup
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
