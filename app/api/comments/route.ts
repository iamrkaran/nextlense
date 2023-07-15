import connectDB from "@/config/dbConnect";
import PostModel from "@/models/post";

import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");

    await connectDB();

    const comments = await PostModel.findById(postId)
      .populate("comments")
      .exec();

    return new NextResponse(JSON.stringify({ comments }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: "Something went wrong" }), {
      status: 500,
    });
  }
};

export { handler as POST, handler as GET };
