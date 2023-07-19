import connectDB from "@/config/dbConnect";
import PostModel from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDB();
    // Use the `limit()` method to get only 6 posts
    const posts = await PostModel.find({}).limit(9);
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: "Something went wrong" }), {
      status: 500,
    });
  }
};

export { handler as POST, handler as GET };
