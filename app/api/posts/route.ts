// import connectDB from "@/config/dbConnect";
// import PostModel from "@/models/post";

// export async function GET(req: Request , res: Response) {
//   try {
//     await connectDB();
//     const posts = await PostModel.find();
//     return new Response(JSON.stringify(posts), {
//       headers: { "content-type": "application/json" },
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       return new Response(error.message, { status: 500 });
//     }
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }

import connectDB from "@/config/dbConnect";
import PostModel from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  const posts = await PostModel.find();
  return NextResponse.json(posts);
}
