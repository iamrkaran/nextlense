import connectDB from "@/config/dbConnect";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify({ msg: "No user ID provided" }), {
        status: 400,
      });
    }

    await connectDB();

    const response = await UserModel.findById(userId);
    return new NextResponse(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: "Something went wrong" }), {
      status: 500,
    });
  }
};

export { handler as POST, handler as GET };
