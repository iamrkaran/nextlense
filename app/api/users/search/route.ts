import connectDB from "@/config/dbConnect";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("query");

    if (!searchQuery) {
      return new NextResponse(
        JSON.stringify({ msg: "No search query provided" }),
        { status: 400 }
      );
    }

    await connectDB();
    const users = await UserModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { username: { $regex: searchQuery, $options: "i" } },
      ],
    });
    return new NextResponse(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: "Something went wrong" }), {
      status: 500,
    });
  }
};

export { handler as POST, handler as GET };
