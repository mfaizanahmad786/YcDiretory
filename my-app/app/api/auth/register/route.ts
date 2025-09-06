
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, username, email, password } = body;

        // Validation
        if (!name || !email || !username || !password) {
            return NextResponse.json(
                { error: "Please fill all fields" },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user
        const newUser = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                username: username,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                bio: true,
                avatar: true,
                createdAt: true,
            }
        });

        return NextResponse.json(
            {
                message: 'User created successfully',
                user: newUser
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Registration Error" },
            { status: 500 }
        )
    }
}