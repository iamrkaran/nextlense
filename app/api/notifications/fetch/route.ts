import connectDB from "@/config/dbConnect";
import Notification from "@/models/notifications";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDB();
    const notifications = await Notification.find({});
    return new NextResponse(JSON.stringify(notifications), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: "Something went wrong" }), {
      status: 500,
    });
  }
}

export { handler as GET };
