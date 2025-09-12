'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                // Success - redirect to sign in with success message
                router.push('/signin?message=Account created successfully! Please sign in.')
            } else {
                setError(data.error || 'Something went wrong')
            }
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-pink-600 to-red-500 flex items-center justify-center pattern">
            <div className="bg-white rounded-3xl border-4 border-black p-8 max-w-md w-full mx-4 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-black mb-2">Join Us!</h1>
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

                    <p className="text-gray-600 mt-4">Create your account to start pitching</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-black"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-black"
                            placeholder="Choose a username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-black"
                            placeholder="At least 6 characters"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-black"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-pink-500 font-bold hover:text-pink-600">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}