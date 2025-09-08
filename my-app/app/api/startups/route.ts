import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { describe } from "node:test";
import { error } from "console";

export async function GET(request: NextRequest) {
    try {

        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized, please sign in" },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const authorId = searchParams.get('authorId');

        if (!authorId) {
            return NextResponse.json({
                error: "No author id specified"
            })
        }


        const startups = await prisma.startup.findMany({
            where: { authorId: authorId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })


        return NextResponse.json({
            success: true,
            startups,
            count: startups.length

        });

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch startups" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized, please sign in" },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { title, description, category, imageLink, pitch } = body;

        if (!title || !description || !category || !imageLink || !pitch) {
            return NextResponse.json(
                { error: "Please fill all required fields" },
                { status: 400 }
            )
        }

        const newStartup = await prisma.startup.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                category: category.trim(),
                imageLink: imageLink.trim() || null,
                pitch: pitch.trim(),
                authorId: session.user.id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true,
                    }
                }
            }
        })

        return NextResponse.json({
            success : true,
            message: "Startup creted succesfully!",
            startup: newStartup
        },{status:201})


    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch startups" },
            { status: 500 }
        )
    }
}