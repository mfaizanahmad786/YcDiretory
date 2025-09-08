'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/assets/public/logo.png'
import { useSession } from 'next-auth/react'
import { stat } from 'fs'

const Header = () => {
  const {data: session,status} = useSession()
  return (
    <header className="w-full bg-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src={logo} 
            alt="Logo" 
            width={120} 
            height={40} 
            className="object-contain"
            style={{ width: 'auto', height: '40px' }}
          />
        </Link>

        {/* Navigation */}

        
        <div className="flex items-center space-x-6">
          <Link 
            href="/create" 
            className="text-black hover:text-gray-700 font-bold transition-colors"
          >
            {status === "unauthenticated" ? "" : "Create"}
          </Link>
          <Link 
            href={status === "unauthenticated" ? "/signin" : "/"}
            
            >
          <button className="text-red-500 hover:text-red-600 font-bold cursor-pointer">
            {status === "unauthenticated" ? "Login" : "Logout"}
          </button>
          </Link>
          {/* Profile Picture */}
          {status === "authenticated" ? 
          <Link href="/profile" className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-pink-500 transition-all">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </Link>
          : <div></div>}
        </div>
      </div>
    </header>
  )
}

export default Header