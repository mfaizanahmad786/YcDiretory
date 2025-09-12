'use client'
import React,{useEffect,useState} from 'react';
import Image from 'next/image';
import decoration from '../public/assets/public/SVG.png';
import {useSession} from 'next-auth/react'

interface UserProfile {
  bio: string | null;
  startupCount: number
}

const ProfileCard = () => {
  const {data: session} = useSession()
  const [userProfile,setUserProfile] = useState<UserProfile | null>(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const fetchUserData = async () => {
      if(!session?.user?.id) return

      try{
        const response = await fetch(`/api/user/${session.user.id}`)
        const data = await response.json()

        if(response.ok){
          setUserProfile({bio:data.user.bio,startupCount: data.user.startupCount})
        }
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    fetchUserData()
  },[session])  

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl p-6 text-white">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-white/20 rounded mb-2"></div>
          <div className="h-3 bg-white/20 rounded mb-4"></div>
        </div>
      </div>
    );
  }


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
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black px-4 py-2 rounded-2xl border-4 border-black min-w-fit text-center font-bold text-xl -rotate-3">
        <span className="opacity-0">{session?.user?.name}</span>
      </div>

      {/* NATHAN SMITH name badge overlapping the card */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20 bg-white text-black px-4 py-2 rounded-2xl border-4 border-black min-w-fit flex items-center justify-center font-extrabold text-xl shadow-lg">
        <span className="text-center">{session?.user?.name}</span>
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
        <h2 className="text-3xl font-extrabold">@{session?.user?.username}</h2>
      </div>

      {/* Bio */}
      <div className="text-center mb-6">
        <p className="text-sm opacity-90">{userProfile?.bio}</p>
      </div>

      {/* Location */}
      

      {/* Stats or additional info can be added here */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="grid gap-4 text-center">
          <div>
            <div className="font-bold text-lg">{userProfile?.startupCount || 0}</div>
            <div className="text-xs opacity-75">Startups</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfileCard;
