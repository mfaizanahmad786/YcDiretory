import { NextRequest,NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"

export async function GET(request:NextRequest){
    try{
        const {searchParams} = new URL(request.url)
        const query = searchParams.get('q');

        if(!query || query.trim().length===0){
            return NextResponse.json({
                success: true,
                results:[],
                count:0,
                message:"Please enter a search term "
            })
        }

        const results = await prisma.startup.findMany({
            where:{
                OR:[
                    {title:{contains:query}},
                    {category:{contains:query}},
                    {description:{contains:query}}
                ]
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
            },orderBy:{
                createdAt:'desc'
            }
        })

        console.log("search query succesfull")
        return NextResponse.json({
            success: true,
            results:results,
            count:results.length,
            message:"Search successsfull"
        })
    }catch(error){
        console.log(error);
        return NextResponse.json(
            {error: "Failed to perform search"},
            {status: 500}
        )
    }
}