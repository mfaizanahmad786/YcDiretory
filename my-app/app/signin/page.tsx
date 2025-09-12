'use client'
import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function SignInContent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const message = searchParams.get('message')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        console.log("🚀 Attempting sign in with:", email)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            console.log("📋 Sign in result:", result)

            if (result?.error) {
                setError('Invalid email or password')
                console.log("❌ Sign in failed:", result.error)
            } else {
                console.log("✅ Sign in successful, redirecting...")
                router.push('/')
                router.refresh()
            }
        } catch (error) {
            console.error("💥 Sign in error:", error)
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-pink-600 to-red-500 flex items-center justify-center pattern">
            <div className="bg-white rounded-3xl border-4 border-black p-8 max-w-md w-full mx-4 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-black mb-2">Welcome Back!</h1>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={"/assets/public/logo.png"}
                            alt="Logo"
                            width={120}
                            height={40}
                            className="object-contain"
                            style={{ width: 'auto', height: '40px' }}
                        />
                    </div>
                    <p className="text-gray-600 mt-4">Sign in to your account</p>
                </div>

                {message && (
                    <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-black"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-black"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-pink-500 font-bold hover:text-pink-600">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function SignIn() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-pink-500 via-pink-600 to-red-500 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        }>
            <SignInContent />
        </Suspense>
    )
}
