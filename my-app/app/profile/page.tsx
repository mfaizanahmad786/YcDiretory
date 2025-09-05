import React from 'react';
import Header from '@/components/Header';
// If the file exists at the correct path, ensure the filename and extension are correct.
// Otherwise, update the import path to the correct location, for example:
import ProfileCard from '../../components/ProfileCard';
import StartupCard from '@/components/StartupCard';

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className='border-b-3 '>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <StartupCard
                                title="EcoTrack"
                                author="Steven Smith"
                                category="Senior level"
                                authorInitials="SS"
                                placeholderText="ECO"
                                gradientFrom="purple-400"
                                gradientTo="orange-400"
                            />
                            <StartupCard
                                title="EcoTrack"
                                author="Steven Smith"
                                category="Education"
                                authorInitials="SS"
                                placeholderText="SLACK"
                                gradientFrom="red-400"
                                gradientTo="pink-400"
                            />
                            <StartupCard
                                title="EcoTrack"
                                author="Steven Smith"
                                category="EdTech"
                                authorInitials="SS"
                                placeholderText="OSMo"
                                gradientFrom="blue-400"
                                gradientTo="cyan-400"
                            />
                            <StartupCard
                                title="EcoTrack"
                                author="Steven Smith"
                                category="Management"
                                authorInitials="SS"
                                placeholderText="MGMT"
                                gradientFrom="green-400"
                                gradientTo="blue-400"
                            />
                            <StartupCard
                                title="EcoTrack"
                                author="Steven Smith"
                                category="EdTech"
                                authorInitials="SS"
                                placeholderText="EDU"
                                gradientFrom="red-400"
                                gradientTo="orange-400"
                            />
                            <StartupCard
                                title="EcoTrack"
                                author="Steven Smith"
                                category="Senior level"
                                authorInitials="SS"
                                placeholderText="NEWS"
                                gradientFrom="purple-400"
                                gradientTo="pink-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
