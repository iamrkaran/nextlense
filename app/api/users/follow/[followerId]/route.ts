import connectDB from "@/config/dbConnect";
import UserModel from "@/models/user";

const handler = async (req: Request, res: Response) => {
  const followerId = req.url!.split("/").pop();
  await connectDB();

  if (!followerId) {
    return new Response("User not found", { status: 404 });
  }

  const follower = await UserModel.findById(followerId);

  if (!follower) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify(follower), {
    headers: { "Content-Type": "application/json" },
  });
}

export { handler as GET };
