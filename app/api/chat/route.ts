import connectDB from "@/config/dbConnect";
import ChatModel from "@/models/chat";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  const { content, sender, receiver, timestamp } = await req.json();
  try {
    await connectDB();
    const chatMessage = new ChatModel({
      content,
      sender,
      receiver,
      timestamp,
    });

    await chatMessage.save();

    return new NextResponse(JSON.stringify(chatMessage), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: "Something went wrong" }), {
      status: 500,
    });
  }
};

export { handler as POST, handler as GET };
