import connectDB from "@/config/dbConnect";
import PostModel from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDB();
    const posts = await PostModel.find({});
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
