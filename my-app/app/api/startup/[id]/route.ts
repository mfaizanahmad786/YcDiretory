import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(request:NextRequest,{params}:{params:{id:string}}) {
    try{
    
        const startup = await prisma.startup.findUnique({
            where:{
                id: await params.id
            },
            include:{
                author:{
                    select:{
                        id:true,
                        name:true,
                        username:true,
                        avatar:true,
                    }
                }
            }
        })

        if(!startup){
            return NextResponse.json(
                {error: "Startup not found"},
                {status:404}
            )
        }

        await prisma.startup.update({
            where:{id: params.id},
            data:{views:{increment:1}}
        })

        return NextResponse.json({
            success: true,
            startup
        })


    }catch(e){
        console.error("💥 Error fetching startup:", e);
        return NextResponse.json(
            { error: "Failed to fetch startup" },
            { status: 500 }
        );
    }
}