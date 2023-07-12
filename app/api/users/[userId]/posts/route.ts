import connectDB from "@/config/dbConnect";
import PostModel from "@/models/post";


export async function GET(req: Request, res: Response) {
  const userId = req.url!.split("/")[5];
  // console.log(userId);

  await connectDB();

  const posts = await PostModel.find({ user: userId }).exec();
 

  if (!posts) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });

}
