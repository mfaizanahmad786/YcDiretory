
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'


declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      bio: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    username: string
    bio: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { 
          label: "Email", 
          type: "email", 
          placeholder: "john@example.com" 
        },
        password: { 
          label: "Password", 
          type: "password" 
        }
      },
      async authorize(credentials) {
        console.log("🔐 Authorize function called with:", credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials")
          return null
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase().trim() }
          })
          
          if (!user) {
            console.log("❌ User not found")
            return null
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.log("❌ Invalid password")
            return null
          }

          console.log("✅ Login successful for:", user.email)

          // Return user object (this data will be passed to jwt callback)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio ?? "",
          }
        } catch (error) {
          console.error('💥 Auth error:', error)
          return null
        }
      }
    })
  ],
  
  callbacks: {
    // 💾 JWT Callback - Save user data to token
    async jwt({ token, user }) {
      console.log("🔧 JWT callback called")
      console.log("User data:", user) // Only available on first sign in
      
      if (user) {
        // Save custom user data to token
        token.id = user.id
        token.username = user.username
        token.bio = user.bio
        console.log("✅ Saved user data to token")
      }
      
      return token
    },
    
    // 📤 Session Callback - Make token data available in session
    async session({ session, token }) {
      console.log("📋 Session callback called")
      
      if (token && session.user) {
        // Add token data to session
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.bio = token.bio as string
        console.log("✅ Added token data to session")
      }
      
      return session
    },
  },
  
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  debug: true, // Enable debug logs
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }