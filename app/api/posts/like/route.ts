import connectDB from "@/config/dbConnect";
import PostModel from "@/models/post";
import mongoose, { Document, Schema } from "mongoose";

const handler = async (req: Request, res: Response) => {
  try {
    if (req.method === "POST") {
      const { postId, userId } = await req.json();
      await connectDB();

      if (
        !mongoose.Types.ObjectId.isValid(postId) ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        return new Response("Invalid ID", { status: 400 });
      }

      const post = await PostModel.findById(postId);
      if (!post) {
        return new Response("Post not found", { status: 404 });
      }

      if (post.likes.includes(userId)) {
        // If user has already liked the post, remove their userId from the likes array (unlike)
        post.likes = post.likes.filter((id:string) => id.toString() !== userId);
        // console.log(post.likes);
      } else {
        // If user has not liked the post, add their userId to the likes array (like)
        post.likes.push(userId);
      }

      const updatedPost = await post.save();

      return new Response(JSON.stringify(updatedPost), { status: 200 });
    } else {
      return new Response("Method not allowed", { status: 405 });
    }
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};

export { handler as POST, handler as GET };
