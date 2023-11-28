import {NextResponse} from "next/server";
import prisma from "@/utils/connect";

export const GET = async(req)=>{
    const {searchParams} = new URL(req.url);
    const page = searchParams.get("page");
    const cat = searchParams.get("cat");
    const POST_PER_PAGE = 3;
    try {
        const posts = await prisma.post.findMany({
            take: POST_PER_PAGE,
            skip: POST_PER_PAGE * (page-1),
            where: {
                ...(cat && {catSlug:cat}),
            }
        });
        return new NextResponse(
            JSON.stringify(posts, {status: 200})
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({message: "Something went wrong!"}, {status: 500})
        );
    }
}