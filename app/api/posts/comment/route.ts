import connectDB from "@/config/dbConnect";
import PostModel from "@/models/post";
import mongoose, { Document, Schema } from "mongoose";

const handler = async (req: Request, res: Response) => {
  try {
    if (req.method === "POST") {
      const { postId, userId, comment } = await req.json();
      await connectDB();

      if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return new Response("Invalid ID", { status: 400 });
      }

      const post = await PostModel.findById(postId);
      if (!post) {
        return new Response("Post not found", { status: 404 });
      }

      // Add the comment to the post
      post.comments.push({ user: userId, text: comment });
      const updatedPost = await post.save();

      return new Response(JSON.stringify(updatedPost), { status: 200 });
    } 
    else if (req.method === "DELETE") {
      const { postId, userId, commentId } = await req.json();
      await connectDB();

      const post = await PostModel.findById(postId);
      if (!post) {
        return new Response("Post not found", { status: 404 });
      }

      const commentIndex = post.comments.findIndex((c: {id: string, user: string}) => c.id === commentId && (c.user === userId || post.author === userId));
      
      if (commentIndex === -1) {
        return new Response("Unauthorized to delete the comment", { status: 403 });
      }
      
      // Delete the comment
      post.comments.splice(commentIndex, 1);
      const updatedPost = await post.save();

      return new Response(JSON.stringify(updatedPost), { status: 200 });
    } 
    else {
      return new Response("Method not allowed", { status: 405 });
    }
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};

export { handler as POST, handler as DELETE };
