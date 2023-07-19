import connectDB from "@/config/dbConnect";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {

    await connectDB();
  
    const user = await UserModel.find({});

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  return new NextResponse(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
}
