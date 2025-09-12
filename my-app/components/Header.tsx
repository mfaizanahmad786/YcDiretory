'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/assets/public/logo.png'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const {data: session, status} = useSession()
  const router = useRouter()

  const handleAuthAction = () => {
    if(status === "unauthenticated"){
      router.push('/signin')
    }else{
      signOut({callbackUrl: '/' })
    }
  }
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
          
          <button className="text-red-500 hover:text-red-600 font-bold cursor-pointer"
          onClick={handleAuthAction}>
            {status === "unauthenticated" ? "Login" : "Logout"}
          </button>
          
          {/* Profile Picture */} 
          {status === "authenticated" && (
            <Link href="/profile" className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-pink-500 transition-all">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header