'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function TestAuth() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">🧪 Authentication Test</h1>
        
        {status === 'unauthenticated' ? (
          // User is NOT signed in
          <div className="bg-white rounded-lg border-2 border-red-200 p-6 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">❌ Not Signed In</h2>
            <p className="text-gray-600 mb-6">Please sign in to test the authentication.</p>
            <div className="space-x-4">
              <Link 
                href="/signup"
                className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Sign Up
              </Link>
              <Link 
                href="/signin"
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        ) : (
          // User IS signed in
          <div className="bg-white rounded-lg border-2 border-green-200 p-6">
            <h2 className="text-xl font-bold text-green-600 mb-4">✅ Authentication Successful!</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">Session Data:</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Name:</strong> {session?.user?.name}</p>
                <p><strong>Email:</strong> {session?.user?.email}</p>
                <p><strong>Username:</strong> {session?.user?.username}</p>
                <p><strong>Bio:</strong> {session?.user?.bio || 'No bio set'}</p>
                <p><strong>User ID:</strong> {session?.user?.id}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">🎉 What's Working:</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>✅ User registration (signup)</li>
                <li>✅ User login (signin)</li>
                <li>✅ Session management</li>
                <li>✅ Custom user data in session</li>
                <li>✅ Token callbacks working</li>
              </ul>
            </div>

            <div className="space-x-4 text-center">
              <Link 
                href="/"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Go to Homepage
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <details>
                <summary className="cursor-pointer font-bold">🔍 Full Session Object (Click to expand)</summary>
                <pre className="mt-2 text-xs overflow-auto bg-white p-2 rounded border">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}