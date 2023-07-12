import connectDB from "@/config/dbConnect";
import UserModel from "@/models/user";

export async function GET(req: Request, res: Response) {
    const username = req.url!.split("/").pop();

    await connectDB();
  
    const user = await UserModel.findOne({username: username}).exec();

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
}
