import connectDB from "@/config/dbConnect";
import ChatModel  from "@/models/chat";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  const url = new URL(req.url);
  const sender = url.searchParams.get("sender");
  const receiver = url.searchParams.get("receiver");
  if (!sender || !receiver) {
    return new NextResponse(JSON.stringify({ msg: "No user ID provided" }), {
      status: 400,
    });
  }
  try {
    await connectDB();
    const response = await ChatModel.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    });
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
