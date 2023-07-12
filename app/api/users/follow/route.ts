import connectDB from "@/config/dbConnect";
import UserModel from "@/models/user";
import mongoose, { Document, Schema } from "mongoose";

const handler = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = await req.json();
    await connectDB();

    if (
      !mongoose.Types.ObjectId.isValid(followerId) ||
      !mongoose.Types.ObjectId.isValid(followingId)
    ) {
      return new Response("Invalid ID", { status: 400 });
    }

    const follower = await UserModel.findById(followerId);
    const following = await UserModel.findById(followingId);

    if (!follower || !following) {
      return new Response("User not found", { status: 404 });
    }

    // Find the index of followingId in follower's following array
    const followingIndex = follower.following.indexOf(followingId);

    if (followingIndex > -1) {
      // If it exists, then it's an unfollow action
      follower.following.splice(followingIndex, 1);
      following.followers.splice(following.followers.indexOf(followerId), 1);
    } else {
      // If it does not exist, then it's a follow action
      follower.following.push(followingId);
      following.followers.push(followerId);
    }

    await follower.save();
    await following.save();

    return new Response("OK");
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};

export { handler as POST };
