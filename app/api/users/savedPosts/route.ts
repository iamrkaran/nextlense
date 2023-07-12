import connectDB from "@/config/dbConnect";
import UserModel from "@/models/user";
import PostModel from "@/models/post"; // assuming you have this model
import mongoose, { Document, Schema } from "mongoose";

const handler = async (req: Request, res: Response) => {
  try {
    await connectDB();

    if (req.method === "POST") {

      const { postId, userId } = await req.json();

      const user = await UserModel.findById(userId);
      if (!user) {
        return new Response("User not found", { status: 404 });
      }

      const index = user.savedPosts.indexOf(postId);
      if (index !== -1) {
        // Post already saved, so remove it
        user.savedPosts.splice(index, 1);
      } else {
        // Save the post
        user.savedPosts.push(postId);
      }

      await user.save();

      return new Response("OK");
    } else if (req.method === "GET") {
      const url = req.url!.split("/").pop();
      const userId = url!.split("userId=")[1];
      // console.log(userId);
      const user = await UserModel.findById(userId);
      if (!user) {
        return new Response("User not found", { status: 404 });
      }

      // Fetch all saved posts
      const savedPosts = await PostModel.find({
        _id: { $in: user.savedPosts },
      });

      return new Response(JSON.stringify(savedPosts));
    }
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};

export { handler as POST, handler as GET };
