import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { SiCucumber } from "react-icons/si";

export async function GET(request:NextRequest,
    {params} : {params: Promise<{id: string}>}
) {
    try{
        const {id} = await params;

        const user = await prisma.user.findUnique({
            where:{id:id},
            select:{
                id:true,
                name:true,
                username:true,
                avatar:true,
                bio:true,
                createdAt:true,
                _count:{
                    select:{
                        startups:true
                    }
                }
            }
        })

        if(!user){
            return NextResponse.json({
                error:"User not found"
            },{status:404})
        }

        return NextResponse.json({
            Success: true,
            user:{
                ...user,
                startupCount: user._count.startups
            }
        })
        

    }catch(error){
        return NextResponse.json(
            {error:"Failed to fetch user details"},
            {status:500}
        )
    }
}
