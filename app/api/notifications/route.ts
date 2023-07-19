import connectDB from "@/config/dbConnect";
import Notification from "@/models/notifications";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  const { type, postId, sender, timestamp } = await req.json();
  try {
    await connectDB();
    const newNotification = new Notification({
      type,
      postId,
      sender,
      timestamp,
    });
    await newNotification.save();
    return new NextResponse(JSON.stringify(newNotification), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: "Something went wrong" }), {
      status: 500,
    });
  }
}

export { handler as POST };
