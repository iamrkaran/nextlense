// Import the necessary modules and dependencies
import UserModel, { IUser } from "@/models/user";
import connectDB from "@/config/dbConnect";
import PostModel from "@/models/post";
import { NextRequest, NextResponse } from "next/server";


const handler = async (req: NextRequest, res: NextResponse) => {
  const { userId, name, bio, website ,gender} = await req.json();

  try {
    await connectDB();

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, bio, website , gender},
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
    });
  } catch (error) {
    console.error("Error editing account:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error editing account" }),
      {
        status: 500,
      }
    );
  }
};

export { handler as POST };
